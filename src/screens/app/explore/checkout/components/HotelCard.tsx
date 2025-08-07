import { Image, StyleSheet, View } from 'react-native';
import React from 'react';

import { useAppSelector } from '@app/hooks/redux.hook';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { map_point_outline_icon, star_icon } from '@app/utils/images';
import { normalizePixelSize } from '@app/utils/normalize';

import { colors } from '@app/theme';

const HotelCard = () => {
  const {hotelSelected, hotelVenueDetail} = useAppSelector(state => state.hotels);

  return (
    <View style={styles.card}>
      <View style={styles.cardImage}>
        <Image
          // source={hotelDetails.images[0].url}
          source={{uri: hotelSelected?.images}}
          style={styles.cardImage}
        />
      </View>

      <View style={styles.cardDetail}>
        <View style={styles.rowLocation}>
          <Image
            style={styles.homeIcon}
            source={map_point_outline_icon}
          />
          <TextComponent color="muted" size="12" numberOfLines={1}>{hotelVenueDetail?.address}</TextComponent>
        </View>
        <TextComponent size="18" color="dark" numberOfLines={3}>
          {hotelSelected?.name}
        </TextComponent>

        <View style={styles.rowLocation}>
          <Image
            style={styles.starIcon}
            source={star_icon}
          />
          <TextComponent color="dark" size="12">
            {hotelSelected?.stars.toFixed(1)}
          </TextComponent>
          <TextComponent color="muted" size="12">
            {hotelSelected?.rating_descp}
          </TextComponent>
        </View>
      </View>
    </View>
  );
};

export default HotelCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    gap: 20,
  },
  cardImage: {
    width: normalizePixelSize(134, 'height'),
    height: normalizePixelSize(94, 'height'),
    resizeMode: 'cover',
    borderRadius: 8,
  },
  cardDetail: {
    justifyContent: 'space-between',
    paddingVertical: 2,
    flexShrink: 1,
    height: normalizePixelSize(94, 'height'),
  },
  rowLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  homeIcon: {
    width: normalizePixelSize(12, 'height'),
    height: normalizePixelSize(12, 'height'),
    tintColor: colors.muted,
  },
  starIcon: {
    width: normalizePixelSize(12, 'height'),
    height: normalizePixelSize(12, 'height'),
  },
});
