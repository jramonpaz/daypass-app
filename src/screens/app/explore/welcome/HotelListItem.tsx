import { Animated, Image, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React, { useRef, useState } from "react";

import TextComponent from "@app/components/atoms/text/TextComponent";
import ImageComponent from "@app/components/atoms/icons/ImageComponent";

import { heart_icon, heart_outline_icon, star_icon } from "@app/utils/images";
import { colors } from "@app/theme/colors";

import { nearbyHotels } from "@app/assets/data/nearbyHotels";
import { IHotelNearby } from "@app/types";

export type IHotel = (typeof nearbyHotels)[0];

type Props = {
	data: IHotelNearby;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
	onChangeFavorite?: (favorite: boolean) => void;
};

const HotelListItem = (props: Props) => {
	const [isFavorite, setIsFavorite] = useState(props.data.favorite ?? false);
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

	const handleOnChangeFavorite = () => {
		animateScale();
		const newValue = !isFavorite;
		setIsFavorite(newValue);
		props.onChangeFavorite?.(newValue);
	};

	//console.log("HotelListItem", props.data);

	return (
		<View style={styles.container}>
			<View>
				<ImageComponent
					source={{ uri: props.data.image }}
					style={styles.image}
					resizeMode="cover"
				/>
				{/* <Pressable
					style={styles.favotiteIconContainer}
					onPress={handleOnChangeFavorite}>
					<Animated.View style={{ transform: [{ scale: scaleValue }] }}>
						{isFavorite ? (
							<Image source={heart_icon} style={styles.favoriteIcon} />
						) : (
							<Image
								source={heart_outline_icon}
								style={styles.favoriteIconDisabled}
							/>
						)}
					</Animated.View>
				</Pressable> */}
			</View>
			<View style={styles.content}>
				<View style={styles.cardTitle}>
					<TextComponent weight="bold" size="18" numberOfLines={2}>
						{props.data.name}
					</TextComponent>
				</View>
				<View style={styles.rowDetails}>
					<View style={styles.row}>
						<Image source={star_icon} style={styles.starImage} />
						<TextComponent color="dark">{props.data.rating}</TextComponent>
						<TextComponent color="muted">{props.data.rating_descp}</TextComponent>
						<TextComponent color="muted">{`• (${props.data.reviews})`}</TextComponent>
					</View>
					<TextComponent color="dark">{`${props.data.distance}`}</TextComponent>
				</View>

				{/* <View style={styles.locationContent}>
          <Image source={map_point_outline_icon} style={styles.mapIcon}/>
          <TextComponent color="muted">{'props.data. dir'}</TextComponent>
        </View> */}
			</View>
		</View>
	);
};

export default HotelListItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		// paddingVertical: 10,
		borderRadius: 8,
		overflow: "hidden",
		gap: 20,
	},
	content: {
		flex: 1,
	},
	image: {
		width: 112,
		height: 112,
		borderRadius: 8,
		resizeMode: "contain",
	},
	favotiteIconContainer: {
		backgroundColor: colors.white,
		padding: 4,
		borderRadius: 40,
		position: "absolute",
		top: 4,
		right: 4,
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
	cardTitle: {
		marginTop: 4,
		marginBottom: 8,
	},
	starImage: {
		width: 12,
		height: 12,
		resizeMode: "contain",
	},
	mapIcon: {
		width: 12,
		height: 12,
		resizeMode: "contain",
		marginTop: 2,
	},
	rowDetails: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	locationContent: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 4,
	},
});
