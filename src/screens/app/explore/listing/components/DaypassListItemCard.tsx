import { Dimensions, Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";

import ImageCarousel from "@app/components/organisms/carousel/ImageCarousel";
import TextComponent from "@app/components/atoms/text/TextComponent";
import HeartIcon from "@app/components/atoms/icons/HeartIcon";
import MoodButton from "./MoodButton";
import LabelWithIcon from "@app/components/molecules/LabelWithIcon";
import DaypassContractableProduct from "./DaypassContractableProduct";

import { generateImageUrls } from "@app/utils/apiParser.util";
import { generateServiceIconUrl, servicesIconsIndex } from "@app/utils/icons.util";
import { normalizePixelSize } from "@app/utils/normalize";

import { star_icon } from "@app/utils/images";

import { IHotelListItem } from "@app/types";
import { colors } from "@app/theme";
import { useAppSelector } from "@app/hooks/redux.hook";
import { ServiceIcon } from "@app/components/atoms/servicesIconsSvg/ServiceIcon";

type Props = {
	// daypass: IDaypassDetailListItem,
	hotelItem: IHotelListItem;
	onPress?: () => void;
};

const DaypassListItemCard = (props: Props) => {
	const { hotelItem } = props;

	const { t } = useTranslation();

	const { currency, language } = useAppSelector(state => state.general);

	const imagesUrl = generateImageUrls(hotelItem.images, 1);
	const imagesSource = imagesUrl.map(url => ({ uri: url }));

	return (
		<View style={styles.container}>
			<View style={styles.imageSlideContainer}>
				<ImageCarousel
					// images={imagesUrl}
					images={imagesSource}
					paginationType={imagesSource.length > 1 ? "dots" : "none"}
					imageStyle={styles.imageStyle}
				/>

				{/* <HeartIcon containerStyle={styles.heartContainer} /> */}
			</View>
			<View style={styles.cardDetail}>
				<Pressable style={styles.cardDetail} onPress={props.onPress}>
					<View style={styles.detailHeadContainer}>
						<TextComponent size="16" weight="bold">
							{hotelItem.name}
						</TextComponent>
						<View style={styles.rowDetail}>
							<Image
								source={star_icon}
								style={styles.starIcon}
								resizeMethod="resize"
							/>
							<TextComponent size="14" color="dark">
								{hotelItem.stars.toFixed(1)}
							</TextComponent>
							<TextComponent
								size="14"
								color="muted">{`${hotelItem.rating_descp}•(${hotelItem.reviews})`}</TextComponent>
						</View>

						<View style={styles.moodsRow}>
							{hotelItem.vibes.map(vibe => (
								<MoodButton
									mood={vibe[language as keyof typeof vibe]}
									key={vibe.id}
								/>
							))}
						</View>
					</View>
				</Pressable>
				<ScrollView
					horizontal={true}
					nestedScrollEnabled={true}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.servicesRow}>
					{hotelItem.services.map((service, index) => {
						const CID = service.id + "";
						// const IconComponent =
						// 	servicesIconsIndex[CID] ?? servicesIconsIndex["1"];

						const uri = generateServiceIconUrl(CID);
						return (
							<LabelWithIcon
								key={`${index}-${service.id}`}
								label={`${service[language as keyof typeof service]}`}
								// iconSource={beach_icon}
								// iconComponent={
								// 	IconComponent && <IconComponent fill={colors.muted} />
								// }
								iconComponent={
									<ServiceIcon
										width={24}
										height={24}
										uri={uri}
										fill={colors.muted}
									/>
								}
								theme="muted"
								size="small"
							/>
						);
					})}
				</ScrollView>

				<ScrollView
					horizontal={true}
					nestedScrollEnabled={true}
					showsHorizontalScrollIndicator={false}>
					{hotelItem.tickets.map((ticket, index) => {
						let alertLabel;
						let type;

						if (ticket.isIncluded) {
							alertLabel = t("consumption_included");
							type = "blue";
						} else if (ticket.remainingTickets < 10) {
							alertLabel = `${t("only")} ${ticket.remainingTickets} ${t(
								"left",
							)}`;
							type = "yellow";
						}

						return (
							<DaypassContractableProduct
								key={`${index}-${ticket.name}`}
								currency={currency}
								fee={`${ticket.pvp}`}
								title={ticket.name}
								alertLabel={alertLabel}
								alertType={type as "yellow" | "blue"}
							/>
						);
					})}
				</ScrollView>
			</View>
		</View>
	);
};

export default DaypassListItemCard;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const PADDING_WIDTH = normalizePixelSize(20, "width") * 2;

const styles = StyleSheet.create({
	container: {
		gap: normalizePixelSize(24, "height"),
	},
	detailHeadContainer: {
		gap: normalizePixelSize(10, "height"),
	},
	imageSlideContainer: {
		height: normalizePixelSize(240, "height"),
		borderRadius: 16,
		overflow: "hidden",
		width: "100%",
		flexGrow: 1,
	},
	imageStyle: {
		height: normalizePixelSize(240, "height"),
		width: SCREEN_WIDTH - PADDING_WIDTH,
		// flexGrow: 1,
		resizeMode: "cover",
	},
	heartContainer: {
		position: "absolute",
		top: 10,
		right: 10,
		padding: 6,
	},
	cardDetail: {
		gap: normalizePixelSize(20, "height"),
	},
	starIcon: {
		width: normalizePixelSize(12, "height"),
		height: normalizePixelSize(12, "height"),
		resizeMode: "contain",
	},
	rowDetail: {
		flexDirection: "row",
		alignItems: "center",
		gap: normalizePixelSize(4, "width"),
	},
	moodsRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: normalizePixelSize(8, "width"),
		justifyContent: "flex-start",
		flexWrap: "wrap",
	},
	servicesRow: {
		// flexDirection: 'row',
		alignItems: "center",
		// flex: 1,
		// overflow: 'scroll',
		gap: normalizePixelSize(10, "width"),
		// justifyContent:'flex-start',
		// flexWrap: 'wrap',
	},
});
