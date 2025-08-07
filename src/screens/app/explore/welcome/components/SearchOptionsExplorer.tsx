import { StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { searchActions } from "@app/store/slices/search/search.slice";
import { getExplorerSearchPredictionService } from "@app/store/slices/search/search.service";
import { useAppDispatch, useAppSelector } from "@app/hooks/redux.hook";

import FieldSearch from "@app/components/organisms/fields/FieldSearch";
import FiledDatePicker from "@app/components/organisms/fields/FiledDatePicker";
import FieldBase from "@app/components/organisms/fields/FieldBase";
import ButtonComponent from "@app/components/molecules/buttons/ButtonComponent";
import TextComponent from "@app/components/atoms/text/TextComponent";
import ListLocationSearch from "../ListLocationSearch";

import { normalizePixelSize } from "@app/utils/normalize";
import { formatDate } from "@app/utils/dates.util";

import { calendar_outline_icon, profile_outline_icon, search_icon } from "@app/utils/images";
import { IAPIExplorerSearch, ISearchExplorerForm, SearchPrediction } from "@app/types";
import { colors } from "@app/theme";
import { useTranslation } from "react-i18next";

type Props = {
	onSearch?: (data: IAPIExplorerSearch) => void;
};

const SearchOptionsExplorer = (props: Props) => {
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
	} = useForm<ISearchExplorerForm>({
		mode: "onChange",
		// reValidateMode: 'onChange',
		defaultValues: {
			date: undefined,
			peoples: "",
			search: "",
		},
	});

	const { t } = useTranslation();

	const dispatch = useAppDispatch();
	const { searchPredictionList, isLoading, searchSelectedPrediction } = useAppSelector(
		state => state.search,
	);
	const { isLoading: isLoadingSearch } = useAppSelector(state => state.explore);
	const { currency, language } = useAppSelector(state => state.general);

	const handleOnButtonSearch = (values: ISearchExplorerForm) => {
		if (!searchSelectedPrediction) {
			return;
		}

		dispatch(searchActions.setSearchPredictionList([]));

		const dataPayload: IAPIExplorerSearch = {
			pagenumber: 1,
			rowspage: 10,
			lang: language,
			currency: currency,
			iso_country_pred: searchSelectedPrediction.iso_country,
			id_search_pred: searchSelectedPrediction.id_search,
			date_search: formatDate(values.date, "YYYYMMDD"),
			pax: values.peoples ? +values.peoples : 1,
			stars: "",
			ticket_type: "",
			venue_vibes: "",
			ticket_genserv: "",
			price_from: 0,
			price_to: 999999,
			getPriceMinMax: true,
			orderby: 0,
			onlyAvailable: false,
		};

		props.onSearch && props.onSearch(dataPayload);
		// if (values.date) {
		// }
		// else {
		//   const dataPayload: IAPIExplorerSearch = {
		//     pagenumber: 1,
		//     rowspage: 10,
		//     lang: 'es',
		//     currency: 'MXN',
		//     iso_country_pred: searchSelectedPrediction.iso_country,
		//     id_search_pred: searchSelectedPrediction.id_search,
		//     date_search: formatDate(new Date(), 'YYYYMMDD'),
		//     pax: values.peoples ? +values.peoples : 1,
		//     stars: '',
		//     ticket_type: '',
		//     venue_vibes: '',
		//     ticket_genserv: '',
		//     price_from: 0,
		//     price_to: 0,
		//     getPriceMinMax: true,
		//     orderby: 0,
		//     onlyAvailable: false,
		//   };

		//   props.onSearch && props.onSearch(dataPayload);
		// }
	};

	const handleSelectLocation = (item: SearchPrediction) => {
		dispatch(searchActions.setSearchPredictionList([]));
		dispatch(searchActions.setSearchSelectedPrediction(item));
		setValue("search", item.name);
	};

	const handleOnChangeSearch = async (search: string) => {
		if (search.trim().length >= 2) {
			await dispatch(getExplorerSearchPredictionService(search));
		} else {
			dispatch(searchActions.setSearchPredictionList([]));
		}
	};

	return (
		<View style={styles.filterFieldContainer}>
			<StatusBar
				backgroundColor={colors.primary}
				animated={true}
				barStyle={"light-content"}
			/>

			<Controller
				control={control}
				rules={{ required: true }}
				render={({ field: { onChange, onBlur, value } }) => (
					<FieldSearch
						label={t("search_label")}
						value={value}
						placeholder={t("search_placeholder")}
						leftImage={search_icon}
						onBlur={onBlur}
						onChangeText={text => {
							handleOnChangeSearch(text);
							onChange(text);
						}}
					/>
				)}
				name="search"
			/>
			{errors.search && (
				<TextComponent size="12" color="primary">
					{errors.search.message}
				</TextComponent>
			)}

			<Controller
				control={control}
				rules={{ required: true }}
				render={({ field: { onChange, onBlur, value } }) => (
					<FiledDatePicker
						label={t("date_label")}
						placeholder={t("date_placeholder")}
						value={value ? formatDate(value) : ""}
						leftImage={calendar_outline_icon}
						onBlur={onBlur}
						onChangeDate={onChange}
					/>
				)}
				name="date"
			/>
			{errors.date && (
				<TextComponent size="12" color="primary">
					{errors.date.message}
				</TextComponent>
			)}

			<Controller
				control={control}
				rules={{
					min: { value: 1, message: t("peoples_min_error") },
					max: { value: 50, message: t("peoples_max_error") },
					pattern: {
						value: /^[0-9]+$/,
						message: t("peoples_invalid_number"),
					},
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<FieldBase
						label={t("peoples_label")}
						value={value}
						leftImage={profile_outline_icon}
						placeholder={t("peoples_placeholder")}
						type="numeric"
						input
						onChangeText={onChange}
						onBlur={onBlur}
					/>
				)}
				name="peoples"
			/>
			{errors.peoples && (
				<TextComponent size="12" color="primary">
					{errors.peoples.message}
				</TextComponent>
			)}

			<ButtonComponent
				title={t("search_button")}
				disabled={!isValid || isLoading || isLoadingSearch}
				isLoading={isLoading || isLoadingSearch}
				onPress={handleSubmit(handleOnButtonSearch)}
			/>

			{searchPredictionList.length > 0 && (
				<View style={styles.listContainer}>
					<ListLocationSearch
						list={searchPredictionList}
						onSelectOne={handleSelectLocation}
					/>
				</View>
			)}
		</View>
	);
};

export default SearchOptionsExplorer;

const styles = StyleSheet.create({
	filterFieldContainer: {
		gap: normalizePixelSize(12, "height"),
	},
	listContainer: {
		position: "absolute",
		top: normalizePixelSize(60, "height"),
		width: "100%",
		// zIndex: 999,
	},
});
