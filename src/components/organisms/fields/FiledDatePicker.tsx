import React, { useState } from 'react';
import DateTimePicker from 'react-native-ui-datepicker';
import { StyleSheet } from 'react-native';

import FieldBase, { FiledBaseProps } from './FieldBase';
import BottomModalBase from '../../molecules/modals/BottomModalBase';

import { DateFormat, formatDate } from '@app/utils/dates.util';
import { colors } from '@app/theme/colors';

export type FiledDatePickerProps = FiledBaseProps & {
  onChangeDate?: (date: Date) => void,
  open?: boolean,
  date?: Date,
  setOpen?: (open: boolean) => void,
  dateFormat?: DateFormat;
  minDate?: Date;
}

const FiledDatePicker = (props: FiledDatePickerProps) => {
  const [dateSelected, setDateSelected] = useState<Date | undefined>(props.date);
  const [open, setOpen] = useState<boolean>(props.open ?? false);

  const handleConfirmDate = (date: Date) => {
    setOpen(false);
    setDateSelected( new Date(date));
    props.onChangeDate && props.onChangeDate(date);
  };

  return (
    <FieldBase
      {...props}
      value={dateSelected ? formatDate(dateSelected, props.dateFormat || 'D MMM') : ''}
      onPress={() => setOpen(true)}
    >
      <BottomModalBase isVisible={open} setIsVisible={setOpen}>
        <DateTimePicker
          mode="single"
          date={dateSelected}
          selectedItemColor={colors.primary}
          calendarTextStyle={styles.textCalendar}
          headerTextStyle={styles.textCalendar}
          // minDate={props.minDate ?? Date.now() - (1000 * 60 * 60 * 24)}
          minDate={props.minDate ?? new Date().setHours(0,0,0,0)}
          onChange={(params) =>
            handleConfirmDate(params.date as Date)
          }
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
