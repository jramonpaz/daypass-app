import {
	ActivityIndicator,
	Dimensions,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ExploreTabStackParamList } from "@app/navigation/ExploreTabStack";

import {
	general_getNearbyHotels,
	general_searchGeneral,
} from "@app/store/slices/explore/explore.service";
import { getLocationsServices } from "@app/store/slices/locations/location.service";
import { locationsActions } from "@app/store/slices/locations/locations.slice";
import { getHotelsService } from "@app/store/slices/hotels/hotels.service";
import { searchActions } from "@app/store/slices/search/search.slice";
import { exploreActions } from "@app/store/slices/explore/explore.slice";

import { hotelActions } from "@app/store/slices/hotels/hotels.slice";

import { useAppDispatch, useAppSelector } from "@app/hooks/redux.hook";

import SearchOptionsExplorer from "./components/SearchOptionsExplorer";
import ImageBgBtn from "@app/components/molecules/buttons/ImageBgBtn";
import TextComponent from "@app/components/atoms/text/TextComponent";
import HomeFilterModal from "./components/HomeFilterModal";
import HotelListItem from "./HotelListItem";

import { locationData } from "@app/assets/data/location";
import { colors } from "@app/theme/colors";
import { IAPIExplorerSearch, IHotelNearby } from "@app/types";

type NavBarNavigationProp = NavigationProp<ExploreTabStackParamList, "EXPLORE_TAB_SCREEN">;

const ExploreScreen = () => {
	const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
	const [userLocation, setUserLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

	const navigation = useNavigation<NavBarNavigationProp>();

	const { t } = useTranslation();

	const dispatch = useAppDispatch();
	const { isLoading: loadingLocations, locations } = useAppSelector(state => state.locations);
	const { isLoading: loadingHotels, nearbyHotels } = useAppSelector(state => state.hotels);
	const { language } = useAppSelector(state => state.general);
	// const {date, location: locationForm, peopleCount } = useAppSelector(state => state.search);
	// const {isLoading: isLoadingHotels} = useAppSelector(state => state.explore);

	useEffect(() => {
		// Solicitar permisos de ubicación
		Geolocation.requestAuthorization();

		// Obtener la ubicación actual
		Geolocation.getCurrentPosition(
			position => {
				setUserLocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
			},
			error => console.log(error),
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
		);
	}, []);

	useEffect(() => {
		dispatch(getLocationsServices());
		dispatch(getHotelsService());
		dispatch(
			general_getNearbyHotels({
				lang: language,
				lat: userLocation ? `${userLocation.latitude}` : "21.17429",
				lng: userLocation ? `${userLocation.longitude}` : "-86.84656",
			}),
		);
		dispatch(searchActions.setListItems(locationData));
	}, [dispatch, language, userLocation]);

	const handleSelectLocation = (newLocation: any) => {
		dispatch(locationsActions.setSelected(newLocation));
	};

	const handleSelectHotel = (hotel: IHotelNearby) => {
		//dispatch(hotelActions.setSelected(hotel));
		// if (!searchSelectedPrediction || !searchFilterData) {
		//   return;
		// }
		// dispatch(hotelActions.clearAll());
		// dispatch(hotelActions.clearHotelDetails());
		// dispatch(hotelActions.clearPurchaseData());
		// dispatch(hotelActions.setHotelSelected(hotel));
		// navigation.navigate('DAYPASS_DETAIL_SCREEN');
	};

	const toggleFavoriteHotels = (favorite: boolean, hotelId: string) => {
		//dispatch(hotelActions.toggleFavorite({favorite, hotelId}));
	};

	const handleOnSearch = async (data: IAPIExplorerSearch) => {
		// clear all filterdata
		dispatch(exploreActions.cleanAllSelectedVibes());
		dispatch(exploreActions.cleanAllSelectedTicketMoods());
		dispatch(exploreActions.cleanAllSelectedGeneralServices());
		dispatch(exploreActions.cleanSelectedPriceRange());
		dispatch(exploreActions.cleanSelectedHotelStars());

		// handle search results
		dispatch(searchActions.setSearchFilterData(data));
		dispatch(searchActions.setSearchFilterDataBackup(data));
		await dispatch(general_searchGeneral(data));
		navigation.navigate("LISTING_DAYPASS");
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.scrollContent}
				nestedScrollEnabled={true}>
				<StatusBar
					backgroundColor={colors.primary}
					animated={true}
					barStyle={"light-content"}
				/>

				<SearchOptionsExplorer onSearch={handleOnSearch} />

				<View style={styles.sectionList}>
					<TextComponent size="18" weight="bold">
						{t("explore-locations")}
					</TextComponent>
					{loadingLocations ? (
						<ActivityIndicator animating color={colors.primary} size={44} />
					) : (
						<View style={styles.listContainer}>
							{locations.map((location, idx) => {
								const isLast = idx + 1 === locations.length;
								const isOdd = (idx + 1) % 2 !== 0;
								const isLarge = isLast && isOdd;
								return (
									<View
										key={location.id ?? Date.now()}
										style={styles.imgContainer}>
										<ImageBgBtn
											label={location.name}
											imageBg={location.image}
											style={isLarge && styles.largeWidth}
											onPress={() =>
												handleSelectLocation(location)
											}
										/>
									</View>
								);
							})}
						</View>
					)}
				</View>

				<View style={styles.sectionList}>
					<View style={styles.rowHead}>
						<TextComponent size="18" weight="bold">
							{t("explore-nearby-hotels")}
						</TextComponent>
						{/* <TextComponent size="14" color="muted" weight="bold" underline>
							{t("explore-see-all")}
						</TextComponent> */}
					</View>

					{loadingHotels ? (
						<ActivityIndicator animating color={colors.primary} size={44} />
					) : (
						<>
							{nearbyHotels.length > 0 ? (
								nearbyHotels.map(venue => (
									<HotelListItem
										key={venue.id_venue}
										data={venue}
										onChangeFavorite={favorite =>
											toggleFavoriteHotels(
												favorite,
												venue.id_venue,
											)
										}
										onPress={() => handleSelectHotel(venue)}
									/>
								))
							) : (
								<TextComponent size="18" color="muted" textAlign="center">
									{t("explore-no-nearby-hotels")}
								</TextComponent>
							)}
						</>
					)}
				</View>

				<HomeFilterModal
					isVisible={showFilterModal}
					setIsVisible={setShowFilterModal}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default ExploreScreen;

const WIDTH_WINDOW = Dimensions.get("window").width - 60;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: colors.white,
	},
	container: {
		flex: 1,
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		paddingTop: 10,
		// paddingBottom: 30,
	},
	scrollContent: {
		gap: 20,
		paddingVertical: 20,
	},
	filterFieldContainer: {
		gap: 12,
	},
	listContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		// paddingTop: 20,
		// backgroundColor: 'red',
		gap: 4,
	},
	imgContainer: {
		width: WIDTH_WINDOW / 2,
		height: WIDTH_WINDOW / 2,
		// marginBottom: normalizePixelSize(10, 'height'),
	},
	largeWidth: {
		width: WIDTH_WINDOW + 20,
		height: WIDTH_WINDOW / 2,
	},
	//hotels nearby
	rowHead: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// paddingVertical: 10,
	},
	sectionList: {
		marginTop: 14,
		marginBottom: 10,
		gap: 16,
	},
});
