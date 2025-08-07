import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { calendar_outline_icon, delete_icon, kid_icon, people_icon } from '@app/utils/images';
import { formatDate } from '@app/utils/dates.util';
import { normalizePixelSize } from '@app/utils/normalize';
import { formatToCurrency } from '@app/utils/number.util';

import { colors } from '@app/theme';

type Props = {
  title: string;
  date: Date;
  childrens: number;
  adults: number;
  price: number;
  onPressDelete?: () => void;
}

const ReservationDataItem = (props: Props) => {
  return (
    <View style={styles.container}>
      <TextComponent size="16" color="dark">
        {props.title}
      </TextComponent>

      <View style={styles.rowContent}>
        <View style={styles.rowContent}>
          <View style={styles.calendarContainer}>
            <View style={styles.rowDataItem}>
              <Image source={calendar_outline_icon} style={styles.calendarIcon} />
              <TextComponent size="16" color="muted">
                {formatDate(props.date)}
              </TextComponent>
            </View>
          </View>

          <View style={styles.peopleContainer}>
            <View style={styles.rowDataItem}>
              <Image source={people_icon} style={styles.peopleIcon} />
              <TextComponent size="16" color="dark">
                {props.adults}
              </TextComponent>
            </View>

            <View style={styles.rowDataItem}>
              <Image source={kid_icon} style={styles.peopleIcon} />
              <TextComponent size="16" color="dark">
                {props.childrens}
              </TextComponent>
            </View>
          </View>
        </View>

        <View style={styles.rowDataItem}>
          <TextComponent size="16" color="dark">
            {`$${formatToCurrency(props.price, true)}`}
          </TextComponent>
          <Pressable onPress={props.onPressDelete}>
            <Image source={delete_icon} style={styles.trashIcon} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ReservationDataItem;

const styles = StyleSheet.create({
  container: {
    gap: normalizePixelSize(8, 'height'),
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  calendarContainer: {
    gap: normalizePixelSize(12, 'width'),
    height: normalizePixelSize(44, 'height'),
    paddingHorizontal: normalizePixelSize(16, 'width'),
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: colors.light,
    flexDirection: 'row',
    borderColor: colors.lowlight,
    alignItems: 'center',
    borderWidth: 0.5,
  },
  peopleContainer: {
    gap: normalizePixelSize(12, 'width'),
    height: normalizePixelSize(44, 'height'),
    paddingHorizontal: normalizePixelSize(16, 'width'),
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: colors.light,
    flexDirection: 'row',
    borderColor: colors.muted,
    alignItems: 'center',
    borderWidth: 0.5,
  },
  // dataContainer: {
  //   height: normalizePixelSize(44, 'height'),
  //   paddingHorizontal: normalizePixelSize(16, 'width'),
  //   gap: normalizePixelSize(12, 'width'),
  //   backgroundColor: colors.light,
  //   borderColor: colors.muted,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderRadius: 16,
  //   borderWidth: 0.5,
  // },
  rowDataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  calendarIcon: {
    tintColor: colors.muted,
    width: 20,
    height: 20,
  },
  peopleIcon: {
    tintColor: colors.primary,
    width: 20,
    height: 20,
  },
  trashIcon: {
    tintColor: colors.muted,
    width: 20,
    height: 20,
  },
});
