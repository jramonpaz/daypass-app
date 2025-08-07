import {
	Animated,
	Image,
	ImageStyle,
	Pressable,
	StyleProp,
	StyleSheet,
	ViewStyle,
} from "react-native";
import React, { useRef, useState } from "react";

import { heart_icon, heart_outline_icon } from "@app/utils/images";

import { colors } from "@app/theme/colors";

type Props = {
	isActive?: boolean;
	onChange?: (value: boolean) => void;
	iconStyle?: StyleProp<ImageStyle>;
	containerStyle?: StyleProp<ViewStyle>;
	iconActiveStyle?: StyleProp<ImageStyle>;
};

const HeartIcon = (props: Props) => {
	const [isActive, setIsActive] = useState(props.isActive || false);
	const scaleValue = useRef(new Animated.Value(1)).current; // Valor de escala inicial

	const animateScale = () => {
		Animated.sequence([
			Animated.timing(scaleValue, {
				toValue: 1.5,
				duration: 150,
				useNativeDriver: true,
			}),
			Animated.timing(scaleValue, {
				toValue: 1,
				duration: 150,
				useNativeDriver: true,
			}),
		]).start();
	};

	const handleOnChange = () => {
		animateScale();
		const newValue = !isActive;
		setIsActive(newValue);
		props.onChange?.(newValue);
	};

	return (
		<Pressable
			style={[styles.favotiteIconContainer, props.containerStyle]}
			onPress={handleOnChange}>
			<Animated.View style={{ transform: [{ scale: scaleValue }] }}>
				{isActive ? (
					<Image
						source={heart_icon}
						style={[styles.favoriteIcon, props.iconStyle, props.iconActiveStyle]}
					/>
				) : (
					<Image
						source={heart_outline_icon}
						style={[styles.favoriteIconDisabled, props.iconStyle]}
					/>
				)}
			</Animated.View>
		</Pressable>
	);
};

export default HeartIcon;

const styles = StyleSheet.create({
	favotiteIconContainer: {
		backgroundColor: colors.white,
		padding: 4,
		borderRadius: 40,
		// position: 'absolute',
		// top: 4,
		// right: 4,
	},
	favoriteIcon: {
		width: 20,
		height: 20,
		resizeMode: "contain",
		tintColor: colors.red,
	},
	favoriteIconDisabled: {
		width: 20,
		height: 20,
		resizeMode: "contain",
		tintColor: colors.dark,
	},
});
