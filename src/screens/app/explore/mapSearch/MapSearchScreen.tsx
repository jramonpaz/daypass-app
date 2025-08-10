import { Image, Pressable, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Marker } from "react-native-maps";
import LinearGradient from "react-native-linear-gradient";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import MapView from "react-native-map-clustering";
import Geolocation from "@react-native-community/geolocation";

import { useAppDispatch, useAppSelector } from "@app/hooks/redux.hook";
import { general_searchGeneral } from "@app/store/slices/explore/explore.service";
import { exploreActions } from "@app/store/slices/explore/explore.slice";
import { searchActions } from "@app/store/slices/search/search.slice";
import { hotelActions } from "@app/store/slices/hotels";

import { ExploreTabStackParamList } from "@app/navigation/ExploreTabStack";

import CheckboxLabel from "@app/components/molecules/checks/CheckboxLabel";
import FilterComponent from "../listing/components/FilterComponent";
import HomeFilterModal from "../welcome/components/HomeFilterModal";
import MapMarkerComponenent from "@app/components/organisms/MapMarkerComponenent";
import BookingMapSelected from "./componets/BookingMapSelected";
import FiltersAppliedContainer from "./componets/FiltersAppliedContainer";

import { normalizePixelSize } from "@app/utils/normalize";
import { formatDate, parseDateStringToDate } from "@app/utils/dates.util";
import { chevron_left_icon } from "@app/utils/images";

import { colors } from "@app/theme";
import { IAPIExplorerSearch, IHotelListItem } from "@app/types";
import { addDays } from "date-fns";

type NavigationPropType = NavigationProp<ExploreTabStackParamList>;

const MapSearchScreen = () => {
	const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
	const [userLocation, setUserLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

	const { t } = useTranslation();
	const navigation = useNavigation<NavigationPropType>();
	const dispatch = useAppDispatch();

	const { searchSelectedPrediction, searchFilterData } = useAppSelector(state => state.search);
	const { hotelInMapSelected, hotelsListFiltered } = useAppSelector(state => state.hotels);
	const { filtersCount, hotelStarTypes, vibesList, ticketsMoodList, priceRange } =
		useAppSelector(state => state.explore);
	const { currencySelected } = useAppSelector(state => state.general);

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
			error => console.error(error),
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
		);
	}, []);

	const handleChangeShowOlnyAvailable = (value: boolean) => {
		if (!searchFilterData) {
			return;
		}
		const filterPayload: IAPIExplorerSearch = {
			...searchFilterData,
			onlyAvailable: value,
			getPriceMinMax: true,
		};

		dispatch(searchActions.setSearchFilterData(filterPayload));
		dispatch(searchActions.setSearchFilterDataBackup(filterPayload));
		dispatch(general_searchGeneral(filterPayload));
	};

	function handleSelectHotelInMap(hotel: IHotelListItem) {
		if (hotelInMapSelected && hotelInMapSelected.id_venue === hotel.id_venue) {
			// is the same hotel selected, open detail daypass
			handleOnSelectDaypass(hotel);
		} else {
			dispatch(hotelActions.setHotelInMapSelected(hotel));
		}
	}

	const buildFilterData = (getMinMax: boolean): IAPIExplorerSearch | null => {
		if (!searchFilterData || !searchSelectedPrediction) {
			console.error("no have previuos search data");
			return null;
		}
		const selectedMood = ticketsMoodList.filter(mood => !!mood.isSelected);
		const selecteVibes = vibesList.filter(vibe => !!vibe.isSelected);
		const hoteltsype = hotelStarTypes.join(",");

		return {
			...searchFilterData,
			ticket_type: selectedMood ? selectedMood.map(m => m.id_ticket_type).join(",") : "",
			venue_vibes: selecteVibes ? selecteVibes.map(v => v.id_vibe).join(",") : "",
			price_from: priceRange[0],
			stars: hoteltsype ?? "",
			price_to: priceRange[1],
			getPriceMinMax: getMinMax,
			orderby: 0,
			pagenumber: 1,
			//
			rowspage: searchFilterData?.rowspage ?? 10,
			lang: searchFilterData.lang,
			currency: searchFilterData.currency ?? "MXN",
			iso_country_pred: searchSelectedPrediction.iso_country,
			id_search_pred: searchSelectedPrediction.id_search,
			date_search: searchFilterData.date_search,
			pax: searchFilterData.pax ?? 1,
			ticket_genserv: "",
		};
	};

	const handleChangeFilters = async () => {
		if (!searchFilterData || !searchSelectedPrediction) {
			console.error("no have previuos search data asdada");
			return;
		}

		dispatch(exploreActions.setHasChangedFilters(true));

		const newApiFilterSearch: IAPIExplorerSearch | null = buildFilterData(true);

		if (newApiFilterSearch) {
			dispatch(searchActions.setSearchFilterData(newApiFilterSearch));
			dispatch(searchActions.setSearchFilterDataBackup(newApiFilterSearch));
			await dispatch(general_searchGeneral(newApiFilterSearch));
		}
	};

	const handleOnSelectDaypass = (item: IHotelListItem) => {
		if (!searchSelectedPrediction || !searchFilterData) {
			console.warn("open detila daypass but not have necesary data");
			return;
		}

		dispatch(hotelActions.clearAll());
		dispatch(hotelActions.clearHotelDetails());
		dispatch(hotelActions.clearPurchaseData());

		dispatch(hotelActions.setHotelSelected(item));
		navigation.navigate("DAYPASS_DETAIL_SCREEN");
	};

	return (
		<View style={styles.main}>
			<StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />
			<MapView
				style={styles.mapContainer}
				initialRegion={{
					latitude: userLocation?.latitude ?? 21.1619,
					longitude: userLocation?.longitude ?? -86.8515,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				showsUserLocation={true}
				showsMyLocationButton={true}
				followsUserLocation={false}
				clusterColor={colors.primary_a80}
				clusterFontFamily="Strawford-Medium"
				compassOffset={{ x: -10, y: 130 }}>
				{hotelsListFiltered.map(hotel => {

					console.log(hotel)

					return (<Marker
						key={hotel.id_venue}
						coordinate={{
							latitude: hotel.lat,
							longitude: hotel.lng,
						}}>
						<MapMarkerComponenent
							size={64}
							isSelected={
								hotelInMapSelected
									? hotelInMapSelected.id_venue === hotel.id_venue
									: false
							}
							//label={`${currencySelected.symbol}${200}`}
							label={`${200}`}
							onPress={() => handleSelectHotelInMap(hotel)}
						/>
					</Marker>)

				})}
			</MapView>
			<View style={styles.headerContainer}>
				<LinearGradient
					colors={[colors.white_a70, colors.white_a00]}
					style={styles.linearGradient}
					start={{ x: 0, y: 0.65 }}
					end={{ x: 0, y: 1 }}>
					<SafeAreaView>
						<View style={styles.header}>
							<View style={styles.rowFilter}>
								<Pressable onPress={() => navigation.goBack()}>
									<Image
										source={chevron_left_icon}
										style={styles.backIcon}
										resizeMethod="resize"
									/>
								</Pressable>
								<FilterComponent
									style={styles.filter}
									title={searchSelectedPrediction?.name || ""}
									date={formatDate(
										searchFilterData
											? addDays(parseDateStringToDate(
													searchFilterData.date_search,
											  ), 1)
											: new Date(),
									)}
									people={searchFilterData?.pax ?? 2}
									onPressFilter={() => setShowFilterModal(true)}
									filtersCount={filtersCount}
								/>
							</View>

							<FiltersAppliedContainer
								onChangeSomeFilter={handleChangeFilters}
							/>

							<View style={styles.centerContent}>
								<CheckboxLabel
									active={searchFilterData?.onlyAvailable ?? false}
									label={t("show_only_available")}
									labelColor="muted"
									onChange={handleChangeShowOlnyAvailable}
								/>
							</View>
						</View>
					</SafeAreaView>
				</LinearGradient>
			</View>

			{hotelInMapSelected && (
				<View style={styles.selectedHotelContainer}>
					<SafeAreaView>
						<BookingMapSelected
							data={hotelInMapSelected}
							onClose={() => dispatch(hotelActions.removeHotelInMapSelected())}
							onPress={() => handleOnSelectDaypass(hotelInMapSelected)}
						/>
					</SafeAreaView>
				</View>
			)}

			<HomeFilterModal isVisible={showFilterModal} setIsVisible={setShowFilterModal} />
		</View>
	);
};

export default MapSearchScreen;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: colors.white,
	},
	headerContainer: {
		// backgroundColor: colors.white,
		position: "absolute",
		width: "100%",
	},
	header: {
		// paddingHorizontal: normalizePixelSize(20, 'width'),
		paddingBottom: normalizePixelSize(20, "height"),
		gap: 10,
	},
	rowFilter: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: normalizePixelSize(10, "width"),
		paddingHorizontal: normalizePixelSize(20, "width"),
	},
	backIcon: {
		width: normalizePixelSize(24, "width"),
		height: normalizePixelSize(24, "height"),
		tintColor: colors.dark,
		resizeMode: "cover",
	},
	filter: {
		flexGrow: 1,
	},
	mapContainer: {
		width: "100%",
		height: "100%",
	},
	linearGradient: {
		flex: 1,
	},
	selectedHotelContainer: {
		position: "absolute",
		bottom: 10,
		width: "100%",
		paddingHorizontal: normalizePixelSize(20, "width"),
		paddingBottom: normalizePixelSize(20, "height"),
		// alignItems: 'center',
		// justifyContent: 'center',
		alignSelf: "center",
		// backgroundColor: colors.white,
	},
	centerContent: {
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: normalizePixelSize(20, "width"),
	},
	clusterContainer: {
		width: normalizePixelSize(32, "width"),
		height: normalizePixelSize(32, "height"),
		backgroundColor: colors.red,
		padding: normalizePixelSize(40, "width"),
		borderRadius: normalizePixelSize(16, "width"),
		alignItems: "center",
		justifyContent: "center",
	},
});
