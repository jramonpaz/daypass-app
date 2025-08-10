import {
	ActivityIndicator,
	Alert,
	ScrollView,
	Share,
	StatusBar,
	StyleSheet,
	View,
} from "react-native";
import React, { useCallback, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { t } from "i18next";

import { ExploreTabStackParamList } from "@app/navigation/ExploreTabStack";

import {
	hotelActions,
	userPurchaseCheckService,
	viewer_venueGetDetailService,
	viewer_venueGetReviewsService,
	viewer_venueGetTicketsService,
} from "@app/store/slices/hotels";
import { useAppDispatch, useAppSelector } from "@app/hooks/redux.hook";

import DetailInformationTab from "./innerTabs/DetailInformationTab";
import DetailReviewsTab from "./innerTabs/DetailReviewsTab";
// import DetailPolicesTab from './innerTabs/DetailPolicesTab';
import DetailDaypassTab from "./innerTabs/DetailDaypassTab";

import TabsView, { ITabView } from "./components/TabsView";
import FilterHeaderComponent from "./components/FilterHeaderComponent";
import DayPassDetailHeader from "./components/DayPassDetailHeader";
import ButtonComponent from "@app/components/molecules/buttons/ButtonComponent";
import ImageCarousel from "@app/components/organisms/carousel/ImageCarousel";
import TextComponent from "@app/components/atoms/text/TextComponent";
import BottomContainer from "@app/components/atoms/containers/BottomContainer";

import { normalizePixelSize } from "@app/utils/normalize";
import { formatDate, parseDateStringToDate } from "@app/utils/dates.util";
import { formatToCurrency } from "@app/utils/number.util";

import { colors } from "@app/theme/colors";
import {
	IGetVenueDetailsRequest,
	IGetVenueReviewsRequest,
	IPurchaseVenueCheckPayload,
	IVenueTicketsRequest,
} from "@app/types";

import DetailPoliceWebViewTab from "./innerTabs/DetailPoliceWebViewTab";
import { addDays } from "date-fns";
import { generatePriceFormatted } from "@app/utils/currency.util";

type Props = {
	navigation: NavigationProp<ExploreTabStackParamList>;
};

const DaypassDetailScreen = (props: Props) => {
	const dispatch = useAppDispatch();
	const {
		hotelSelected,
		hotelVenueDetail,
		hotelVenueImages,
		hotelVenueTickets,
		purchaseTickets,
		isLoading,
		// purchase
		purchaseSuccess,
		error,
		success,
	} = useAppSelector(state => state.hotels);
	const { searchSelectedPrediction, searchFilterData } = useAppSelector(state => state.search);
	const { currencySelected, language, currency } = useAppSelector(state => state.general);

	const Tabs: ITabView[] = useMemo(
		() => [
			{
				label: t("tab_daypass"),
				content: <DetailDaypassTab />,
				// content: <TextComponent>Daypass</TextComponent>,
			},
			{
				label: t("tab_information"),
				content: <DetailInformationTab />,
			},
			{
				label: t("tab_reviews"),
				content: <DetailReviewsTab />,
			},
			{
				label: t("tab_policies"),
				content: <DetailPoliceWebViewTab />,
			},
		],
		[],
	);

	const loadData = useCallback(() => {
		if (
			!hotelVenueDetail &&
			hotelVenueTickets.length === 0 &&
			hotelSelected &&
			searchSelectedPrediction &&
			searchFilterData
		) {
			// load details
			const payloadDetail: IGetVenueDetailsRequest = {
				id_venue: hotelSelected.id_venue,
				iso_country: searchSelectedPrediction?.iso_country,
				lang: searchFilterData.lang ?? language,
			};
			dispatch(viewer_venueGetDetailService(payloadDetail));

			// load tickets
			const payloadTickets: IVenueTicketsRequest = {
				lang: searchFilterData.lang ?? language,
				iso_country: searchSelectedPrediction?.iso_country,
				id_venue: hotelSelected.id_venue,
				currency: searchFilterData.currency ?? currency,
				date_search: searchFilterData.date_search ?? formatDate(new Date(), "YYYYMMDD"),
			};
			dispatch(viewer_venueGetTicketsService(payloadTickets));

			// load reviews
			const payloadReview: IGetVenueReviewsRequest = {
				pagenumber: 1,
				rowspage: 10,
				lang: language,
				iso_country: searchSelectedPrediction?.iso_country,
				id_venue: hotelSelected.id_venue,
				orderby: 0, // --0 Fecha, 1 Más relevante, 2 Menos relevante
			};
			dispatch(hotelActions.setHotelVieweReviewsRequest(payloadReview));
			dispatch(viewer_venueGetReviewsService(payloadReview));
		}
	}, [
		dispatch,
		hotelSelected,
		searchFilterData,
		searchSelectedPrediction,
		hotelVenueDetail,
		hotelVenueTickets,
		currency,
		language,
	]);

	useFocusEffect(loadData);

	useFocusEffect(
		useCallback(
			() => {
				if (purchaseSuccess) {
					dispatch(hotelActions.clean());
					props.navigation.navigate("CHECKOUT_SCREEN");
				}
				if (error) {
					Alert.alert(t("error-title"), error, [
						{
							text: t("error-accept"),
							style: "default",
							onPress: () => {
								dispatch(hotelActions.clean());
							},
						},
					]);
				}
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[purchaseSuccess, error],
		),
	);

	if (!hotelVenueDetail || !hotelSelected) {
		return (
			<SafeAreaView style={styles.container}>
				{isLoading && <ActivityIndicator size="large" color={colors.primary} />}
				{success && !isLoading && (
					<TextComponent size="14" textAlign="center">
						{success}
					</TextComponent>
				)}
				{!isLoading && !hotelVenueDetail && !success && (
					<TextComponent size="14" textAlign="center">
						{t("hotel-no_info")}
					</TextComponent>
				)}
			</SafeAreaView>
		);
	}

	const imagesUrl = hotelVenueImages?.map(urlImage => ({ uri: urlImage.image })) ?? [];

	function totalAmount() {
		const total = purchaseTickets.reduce((acc, ticket) => ticket.fare + acc, 0);
		return total;
	}

	async function handleShareDaypass() {
		try {
			const result = await Share.share({
				title: hotelVenueDetail?.name,
				message: hotelVenueDetail?.descp,
				url: imagesUrl[0].uri,
				// subject: 'Check out this hotel',
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (e: any) {
			Alert.alert(e.message);
		}
	}

	function handleGoBack() {
		props.navigation.goBack();
	}

	async function handleCheckout() {
		if (searchSelectedPrediction && searchFilterData && hotelSelected) {
			const payloadCheckout: IPurchaseVenueCheckPayload = {
				id_venue: hotelSelected.id_venue,
				currency: searchFilterData.currency,
				iso_country: searchSelectedPrediction?.iso_country,
				date_reservation: formatDate(new Date(), "YYYYMMDD"),
				total: totalAmount(),
				purchase_detail: purchaseTickets,
			};
			await dispatch(userPurchaseCheckService(payloadCheckout));
		}
		// props.navigation.navigate('CHECKOUT_SCREEN');
	}

	return (
		<View style={styles.scroll}>
			<ScrollView
				style={styles.scroll}
				contentContainerStyle={styles.scrollContent}
				// nestedScrollEnabled
			>
				<StatusBar
					barStyle={"dark-content"}
					backgroundColor={"transparent"}
					translucent={true}
					animated={true}
					showHideTransition={"slide"}
				/>

				{isLoading && <ActivityIndicator size={24} color={colors.green} />}
				<View style={styles.imageSlideContainer}>
					<ImageCarousel images={imagesUrl} paginationType="counter" />
				</View>

				<View style={styles.ph20}>
					<DayPassDetailHeader
						title={hotelVenueDetail.name}
						// category={`${hotelVenueDetail.stars} Star Hotel`}
						category={t("star_hotel_rating", { rating: hotelVenueDetail.stars })}
						locationCity={hotelVenueDetail.address}
						ratignScore={hotelVenueDetail.stars}
						ratingDescription={hotelVenueDetail.rating_descp}
						ratingReviewCount={hotelVenueDetail.reviews}
					/>
				</View>

				<TabsView tabs={Tabs} selectedTabIndex={0} />
			</ScrollView>

			<BottomContainer showMargin>
				<View>
					<TextComponent color="muted" size="14">
						{t("total-price")}
					</TextComponent>
					<TextComponent color="primary" size="16" weight="bold">
						{/* {`${searchFilterData?.currency ?? "USD"} ${
							currencySelected.iso
						}${formatToCurrency(totalAmount())}`} */}
						{`${generatePriceFormatted(totalAmount(), searchFilterData?.currency ?? "USD")}`}
					</TextComponent>
				</View>
				<ButtonComponent
					title={t("checkout-button")}
					style={styles.checkoutButton}
					onPress={handleCheckout}
					isLoading={isLoading}
					disabled={isLoading || purchaseTickets.length === 0}
				/>
			</BottomContainer>

			<SafeAreaView style={styles.headerContainer}>
				<FilterHeaderComponent
					onPressBack={handleGoBack}
					onPressShare={handleShareDaypass}
					date={
						searchFilterData
							? addDays(parseDateStringToDate(searchFilterData.date_search), 1)
							: new Date()
					}
					peopleCount={searchFilterData?.pax ?? 2}
				/>
			</SafeAreaView>
		</View>
	);
};

export default DaypassDetailScreen;

// const HEADER_TOP = Platform.OS === 'ios' ? 60 : 40;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	scroll: {
		flex: 1,
		backgroundColor: colors.white,
	},
	scrollContent: {
		// flex: 1,
		gap: normalizePixelSize(24, "height"),
		backgroundColor: colors.white,
	},
	imageSlideContainer: {
		height: normalizePixelSize(290 + 20, "height"),
		width: "100%",
	},
	ph20: {
		paddingHorizontal: normalizePixelSize(20, "width"),
	},
	headerContainer: {
		position: "absolute",
		// top: normalizePixelSize( 10, 'height'),
		paddingHorizontal: normalizePixelSize(20),
	},
	bottomContainer: {
		borderTopWidth: 1,
		alignItems: "center",
		flexDirection: "row",
		gap: normalizePixelSize(24, "width"),
		borderTopColor: colors.lowlight,
		paddingTop: normalizePixelSize(4, "height"),
		paddingBottom: normalizePixelSize(16, "height"),
		paddingHorizontal: normalizePixelSize(20, "height"),
	},
	checkoutButton: {
		flex: 1,
	},
});
