import { Image, StyleSheet, View } from 'react-native';
import React from 'react';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizeFontSize, normalizePixelSize } from '@app/utils/normalize';

import { map_point_outline_icon, star_icon } from '@app/utils/images';

import { colors } from '@app/theme/colors';

type Props = {
  title: string;
  category: string;
  ratignScore: number;
  locationCity: string;
  ratingDescription: string;
  ratingReviewCount: number;
}

const DayPassDetailHeader = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={map_point_outline_icon} style={styles.mapIcon} />
        <TextComponent size="12" color="muted">
          {props.locationCity}
        </TextComponent>
      </View>

      <TextComponent size="24" color="dark" weight="bold" textAlign="left">
        {props.title}
      </TextComponent>

      <View style={styles.row}>
        <Image source={star_icon} style={styles.starIcon} />
        <TextComponent size="12" color="dark">
          {props.ratignScore.toFixed(1) ?? '0'}
        </TextComponent>
        <TextComponent size="12" color="muted">
          {props.ratingDescription ?? ''}
        </TextComponent>

        <TextComponent size="12" color="muted">
          {'•'}
        </TextComponent>

        <TextComponent size="12" color="muted">
          {`(${props.ratingReviewCount})`}
        </TextComponent>
      </View>

      <View style={styles.startHotelBtn}>
        <TextComponent size="12" color="white">
          {props.category}
        </TextComponent>
      </View>
    </View>
  );
};

export default DayPassDetailHeader;

const styles = StyleSheet.create({
  container: {
    gap: normalizePixelSize(12, 'height'),
  },
  mapIcon: {
    width: normalizeFontSize(12),
    height: normalizeFontSize(12),
    tintColor: colors.muted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starIcon: {
    width: normalizeFontSize(12),
    height: normalizeFontSize(12),
    // tintColor: colors.,
  },
  startHotelBtn: {
    borderRadius: 4,
    paddingVertical: normalizePixelSize(6, 'height'),
    paddingHorizontal: normalizePixelSize(8),
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: colors.dark,
  },
});
