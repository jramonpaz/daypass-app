import {
	View,
	SafeAreaView,
	StyleSheet,
	StatusBar,
	Image,
	Pressable,
	FlatList,
	ListRenderItem,
	RefreshControl,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { ExploreTabStackParamList } from "@app/navigation/ExploreTabStack";

import {
	general_searchGeneral,
	general_searchGeneral_nextPage,
	general_searchGeneral_refresh,
} from "@app/store/slices/explore/explore.service";
import { hotelActions } from "@app/store/slices/hotels";
import { searchActions } from "@app/store/slices/search/search.slice";
import { useAppDispatch, useAppSelector } from "@app/hooks/redux.hook";

import FilterComponent from "./components/FilterComponent";
import DaypassListItemCard from "./components/DaypassListItemCard";
import RowButtonSelectComponent from "@app/components/organisms/selects/rowButtons/RowButtonSelectComponent";
import CardLabelComponent from "@app/components/molecules/cards/CardLabelComponent";
import HomeFilterModal from "../welcome/components/HomeFilterModal";
import CheckboxLabel from "@app/components/molecules/checks/CheckboxLabel";
import ButtonComponent from "@app/components/molecules/buttons/ButtonComponent";

import { chevron_left_icon } from "@app/utils/images";
import { normalizePixelSize } from "@app/utils/normalize";
import { formatDate, parseDateStringToDate } from "@app/utils/dates.util";

import { colors } from "@app/theme";
import { IAPIExplorerSearch, IHotelListItem } from "@app/types";

import { addDays } from "date-fns";

type NavigationPropType = NavigationProp<ExploreTabStackParamList>;

const ListingOfDaypassScreen = () => {
	const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const { hotelsListFiltered, isLoading, totalResults } = useAppSelector(state => state.hotels);
	const { searchSelectedPrediction, searchFilterData } = useAppSelector(state => state.search);
	const { filtersCount } = useAppSelector(state => state.explore);

	const navigation = useNavigation<NavigationPropType>();
	const [activeFilterButton, setActiveFilterButton] = useState<1 | 2 | 3>(1);

	const handleFilterButtonPress = async (buttonIndex: 1 | 2 | 3) => {
		if (!searchFilterData) {
			return;
		}
		// filter: "orderby":
		// 0 = ordeando por mejor valorados
		// 1 = ordenado por precio más bajo
		// 2 = ordenado por precio más alto
		// dispatch(searchActions.setSearchFilterData(searchFilterData));
		setActiveFilterButton(buttonIndex);
		if (buttonIndex === 1) {
			// more-relevant
			const filterPayload: IAPIExplorerSearch = {
				...searchFilterData,
				orderby: 0,
			};
			dispatch(searchActions.setSearchFilterData(filterPayload));
			dispatch(searchActions.setSearchFilterDataBackup(filterPayload));
			await dispatch(general_searchGeneral(filterPayload));
		} else if (buttonIndex === 2) {
			// upper-cost
			const filterPayload: IAPIExplorerSearch = {
				...searchFilterData,
				orderby: 2,
			};
			dispatch(searchActions.setSearchFilterData(filterPayload));
			dispatch(searchActions.setSearchFilterDataBackup(filterPayload));
			await dispatch(general_searchGeneral(filterPayload));
		} else if (buttonIndex === 3) {
			// lower-cost
			const filterPayload: IAPIExplorerSearch = {
				...searchFilterData,
				orderby: 1,
			};
			dispatch(searchActions.setSearchFilterData(filterPayload));
			dispatch(searchActions.setSearchFilterDataBackup(filterPayload));
			await dispatch(general_searchGeneral(filterPayload));
		}
	};

	// function handleSearch (text: string) {
	//   dispatch(hotelActions.searchHotels(text.trim()));
	// }

	const handleRefreshPage = async () => {
		if (searchFilterData) {
			await dispatch(general_searchGeneral_refresh(searchFilterData));
		}
	};

	const handleLoadNextPage = async () => {
		if (searchFilterData && totalResults > (searchFilterData.rowspage ?? 10)) {
			await dispatch(general_searchGeneral_nextPage(searchFilterData));
		}
	};

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

	const handleOnSelectDaypass = (item: IHotelListItem) => {
		if (!searchSelectedPrediction || !searchFilterData) {
			return;
		}

		dispatch(hotelActions.clearAll());
		dispatch(hotelActions.clearHotelDetails());
		dispatch(hotelActions.clearPurchaseData());

		dispatch(hotelActions.setHotelSelected(item));
		navigation.navigate("DAYPASS_DETAIL_SCREEN");
	};

	const handleOnOpenMapScreen = () => {
		dispatch(hotelActions.removeHotelInMapSelected());
		navigation.navigate("MAP_SEARCH_SCREEN");
	};

	const renderItem: ListRenderItem<IHotelListItem> = ({ item }) => {
		return (
			<DaypassListItemCard hotelItem={item} onPress={() => handleOnSelectDaypass(item)} />
		);
	};

	console.log("Current search date:", searchFilterData?.date_search);

	return (
		<View style={styles.main}>
			<StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />
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
								searchFilterData?.date_search
									? addDays(parseDateStringToDate(searchFilterData.date_search), 1)
									: new Date(),
							)}
							people={searchFilterData?.pax ?? 2}
							onPressFilter={() => setShowFilterModal(true)}
							filtersCount={filtersCount}
						/>
					</View>

					{/* <FieldSearch
            // label={'¿A donde?'}
            // value={locationForm}
            placeholder={'Buscar'}
            leftImage={search_icon}
            onChangeText={handleSearch}
          /> */}
					<RowButtonSelectComponent
						active={activeFilterButton}
						onPress={handleFilterButtonPress}
					/>

					<View style={styles.checkOnlyAvailableContainer}>
						<CheckboxLabel
							active={searchFilterData?.onlyAvailable ?? false}
							label={t("show_only_available")}
							labelColor="muted"
							onChange={handleChangeShowOlnyAvailable}
						/>
					</View>
				</View>
			</SafeAreaView>

			<FlatList
				style={styles.flatListMain}
				contentContainerStyle={styles.scrollContent}
				data={hotelsListFiltered}
				renderItem={renderItem}
				keyExtractor={(item, index) => `${index}-${item.id_venue}`}
				nestedScrollEnabled={true}
				ListEmptyComponent={
					<CardLabelComponent
						label={
							isLoading
								? t("hotels-list-searching")
								: t("hotels-list-no_results")
						}
					/>
				}
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={handleRefreshPage} />
				}
				onEndReached={handleLoadNextPage}
			/>

			<SafeAreaView style={styles.mapButtonContainer}>
				<ButtonComponent title={t("view_map")} onPress={handleOnOpenMapScreen} />
			</SafeAreaView>

			<HomeFilterModal isVisible={showFilterModal} setIsVisible={setShowFilterModal} />
		</View>
	);
};

export default ListingOfDaypassScreen;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: colors.white,
	},
	flatListMain: {
		// top: -20,
		flex: 1,
		backgroundColor: colors.white,
	},
	scrollContent: {
		paddingHorizontal: normalizePixelSize(20, "width"),
		paddingTop: normalizePixelSize(20, "height"),
		paddingBottom: normalizePixelSize(100, "height"),
		gap: normalizePixelSize(24, "height"),
		backgroundColor: colors.white,
	},
	header: {
		paddingHorizontal: normalizePixelSize(20, "width"),
		paddingBottom: normalizePixelSize(10, "height"),
		gap: 10,
	},
	rowFilter: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: normalizePixelSize(10, "width"),
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
	mapButtonContainer: {
		position: "absolute",
		bottom: normalizePixelSize(20, "height"),
		alignSelf: "center",
	},
	checkOnlyAvailableContainer: {
		// position: 'absolute',
		// bottom: normalizePixelSize(-20, 'height'),
		// zIndex: 20,
		// width: '100%',
		// paddingHorizontal: normalizePixelSize(20, 'width'),
	},
	linearGradient: {
		// flex: 1,
		// paddingVertical: 10,
	},
});
