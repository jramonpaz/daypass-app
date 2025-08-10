import {
	Image,
	ImageSourcePropType,
	ImageStyle,
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";
import React from "react";

import TextComponent from "@app/components/atoms/text/TextComponent";

import { normalizePixelSize } from "@app/utils/normalize";

import { colors } from "@app/theme";

type Props = {
	title?: string;
	icon?: ImageSourcePropType;
	subtitle?: string;
	selected?: boolean;
	onPress?: () => void;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
	// labelStyle?: StyleProp<TextStyle>;
	iconStyle?: StyleProp<ImageStyle>;
};

const SelectOptionWithIcon = (props: Props) => {
	return (
		<Pressable
			disabled={props.disabled}
			onPress={props.onPress}
			style={[styles.container, props.selected && styles.container_selected, props.style]}>
			<View style={styles.leftContent}>
				{props.icon && <Image
					source={props.icon}
					style={[styles.icon, props.iconStyle]}
					resizeMethod="resize"
					resizeMode="cover"
				/>}

				{(props.title || props.subtitle) && <View style={styles.textContainer}>
					{props.title && <TextComponent
						size="14"
						color={props.selected ? "primary" : "dark"}
						weight="bold">
						{props.title}
					</TextComponent>}

					{props.subtitle && <TextComponent size="12" color="muted">
						{props.subtitle}
					</TextComponent>}
				</View>}
			</View>

			<View style={[styles.circle, props.selected && styles.circle_selected]} />
		</Pressable>
	);
};

export default SelectOptionWithIcon;

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: colors.lowlight,
		borderRadius: normalizePixelSize(12),
		paddingHorizontal: normalizePixelSize(16),
		paddingVertical: normalizePixelSize(12),
		flexDirection: "row",
		alignItems: "center",
		// gap: normalizePixelSize(12),
		justifyContent: "space-between",
	},
	container_selected: {
		backgroundColor: colors.light,
		borderColor: colors.primary,
	},
	leftContent: {
		flexDirection: "row",
		alignItems: "center",
		gap: normalizePixelSize(12),
	},
	iconContent: {},
	icon: {
		width: normalizePixelSize(32, "height"),
		height: normalizePixelSize(32, "height"),
		// tintColor: colors.primary,
		// marginLeft: normalizePixelSize(12),
	},
	textContainer: {
		gap: normalizePixelSize(4, "height"),
	},
	circle: {
		// alignSelf: '',
		width: normalizePixelSize(22, "height"),
		height: normalizePixelSize(22, "height"),
		borderRadius: normalizePixelSize(12),
		backgroundColor: colors.white,
		borderColor: colors.medium,
		borderWidth: 1,
	},
	circle_selected: {
		borderColor: colors.primary,
		borderWidth: 5,
	},
});
