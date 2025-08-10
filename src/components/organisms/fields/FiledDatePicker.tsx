import React, { useState } from "react";
import DateTimePicker from "react-native-ui-datepicker";
import { StyleSheet } from "react-native";

import FieldBase, { FiledBaseProps } from "./FieldBase";
import BottomModalBase from "../../molecules/modals/BottomModalBase";

import { DateFormat, formatDate } from "@app/utils/dates.util";
import { colors } from "@app/theme/colors";

import { addDays, subDays } from "date-fns";
import { useAppSelector } from "@app/hooks/redux.hook";

require("dayjs/locale/es");
require("dayjs/locale/en");

export type FiledDatePickerProps = FiledBaseProps & {
	onChangeDate?: (date: Date) => void;
	open?: boolean;
	date?: Date;
	setOpen?: (open: boolean) => void;
	dateFormat?: DateFormat;
	minDate?: Date;
	locale?: string;
};

const FiledDatePicker = (props: FiledDatePickerProps) => {
	const [dateSelected, setDateSelected] = useState<Date | undefined>(props.date);
	const [open, setOpen] = useState<boolean>(props.open ?? false);

	const { language } = useAppSelector(state => state.general);

	const handleConfirmDate = (date: Date) => {
		const myDate = new Date(date);
		const nextDay = addDays(myDate, 1);

		setOpen(false);
		setDateSelected(nextDay);
		props.onChangeDate && props.onChangeDate(nextDay);
	};

	const locale = props.locale || language;

	return (
		<FieldBase
			{...props}
			value={dateSelected ? formatDate(dateSelected, props.dateFormat || "D MMM") : ""}
			onPress={() => setOpen(true)}>
			<BottomModalBase isVisible={open} setIsVisible={setOpen}>
				<DateTimePicker
					locale={locale}
					mode="single"
					date={dateSelected ? subDays(new Date(dateSelected), 1) : undefined}
					selectedItemColor={colors.primary}
					calendarTextStyle={styles.textCalendar}
					headerTextStyle={styles.textCalendar}
					// minDate={props.minDate ?? Date.now() - (1000 * 60 * 60 * 24)}
					minDate={props.minDate ?? new Date().setHours(0, 0, 0, 0)}
					onChange={params => handleConfirmDate(params.date as Date)}
				/>
			</BottomModalBase>
		</FieldBase>
	);
};

export default FiledDatePicker;

const styles = StyleSheet.create({
	textCalendar: {
		color: colors.dark,
	},
});
