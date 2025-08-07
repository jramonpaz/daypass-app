import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';

import HeartIcon from '@app/components/atoms/icons/HeartIcon';
import TextComponent from '@app/components/atoms/text/TextComponent';
import DivisorComponent from '@app/components/molecules/divisor/DivisorComponent';

import { normalizePixelSize } from '@app/utils/normalize';
import { kid_icon, map_point_outline_icon } from '@app/utils/images';

import { colors, gStyles } from '@app/theme';
import { daypass_detail } from '@app/assets/data/daypass-detail';

const CancelledBookingCard = () => {
  const {hotel: daypassDetail} = daypass_detail;

  const image = daypassDetail.images[0];

  function handleOnPress () {
    // props.onPress && props.onPress(daypassDetail);
  }

  return (
    <Pressable style={[styles.container, gStyles.shadow_6]} onPress={handleOnPress}>
      <View style={styles.imageContainer}>
        <Image
          source={image.url}
          alt={image.caption}
          resizeMethod="resize"
          style={styles.imagePortrait}
        />
        <View style={styles.heartIconContainer}>
          <HeartIcon />
        </View>
      </View>

      <View style={styles.content}>
        <View>
          <View style={styles.row}>
            <Image source={map_point_outline_icon} style={styles.mapIcon} />
            <TextComponent size="12" color="muted">
              {daypassDetail.location.city}
            </TextComponent>
          </View>

          <TextComponent size="24" color="dark" weight="bold" textAlign="left">
            {daypassDetail.name}
          </TextComponent>
        </View>

        <View style={styles.reservationContainer}>
          <View style={styles.reserVationItem}>
            <View>
              <TextComponent size="14" color="dark">
                {'DayPass-Adult / $180.00'}
              </TextComponent>
              <TextComponent size="14" color="muted" >
                {'2 personas'}
              </TextComponent>
            </View>
            <Image source={require('@app/assets/images/bed1.png')} style={styles.reservationBedImage} />
          </View>

          <DivisorComponent />

          <View style={styles.reserVationItem}>
            <View>
              <TextComponent size="14" color="dark">
                {'DayBed-Niño / $360.00'}
              </TextComponent>
              <View style={styles.row}>
                <TextComponent size="14" color="muted" >
                  {'2 niños'}
                </TextComponent>
                <Image source={kid_icon} style={styles.dayPassIcon} />
              </View>
            </View>
            <Image source={require('@app/assets/images/bed2.png')} style={styles.reservationBedImage} />
          </View>
        </View>

        <DivisorComponent />

        <View>
          <TextComponent size="12" color="dark">
            {'14 sep (2024)'}
          </TextComponent>
          <TextComponent size="12" color="muted" >
            {'Id: XXXXX'}
          </TextComponent>
          <TextComponent size="12" color="muted" >
            {'Nº de cancelación: 69546888'}
          </TextComponent>
        </View>
      </View>
    </Pressable>
  );
};

export default CancelledBookingCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: normalizePixelSize(16),
    backgroundColor: colors.white,
  },
  content: {
    padding: normalizePixelSize(20, 'height'),
    gap: normalizePixelSize(20, 'height'),
  },
  imageContainer: {
    height: normalizePixelSize(180, 'height'),
    width: '100%',
    overflow: 'hidden',
  },
  imagePortrait: {
    height: normalizePixelSize(180, 'height'),
    width: '100%',
    borderTopLeftRadius: normalizePixelSize(16),
    borderTopRightRadius: normalizePixelSize(16),
    resizeMode: 'cover',
  },
  heartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  mapIcon: {
    width: normalizePixelSize(12, 'height'),
    height: normalizePixelSize(12, 'height'),
    tintColor: colors.muted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reservationContainer: {
    gap: normalizePixelSize(6, 'height'),
  },
  reserVationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  reservationBedImage: {
    width: normalizePixelSize(48, 'height'),
    height: normalizePixelSize(48, 'height'),
    borderRadius: 8,
    resizeMode: 'cover',
  },
  dayPassIcon: {
    width: normalizePixelSize(16, 'height'),
    height: normalizePixelSize(16, 'height'),
    tintColor: colors.muted,
  },
});
