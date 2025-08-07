import { Image, Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

import HeartIcon from '@app/components/atoms/icons/HeartIcon';
import TextComponent from '@app/components/atoms/text/TextComponent';
import DivisorComponent from '@app/components/molecules/divisor/DivisorComponent';

import { normalizePixelSize } from '@app/utils/normalize';
import { formatToCurrency } from '@app/utils/number.util';

import { colors, gStyles } from '@app/theme';
import { kid_icon } from '@app/utils/images';

import { Mock_Daypass_Purchase } from '@app/assets/data/daypass-detail';
import { IBookingsPurchasesDetail } from '@app/types';

type Props = {
  onPress?: (booking: any) => void;
  data?: Mock_Daypass_Purchase | any;
  booking: IBookingsPurchasesDetail;
};

const CurrentBookingCard = (props: Props) => {
  const { t } = useTranslation();

  function handleOnPress() {
    props.onPress && props.onPress(props.booking);
  }

  return (
    <Pressable style={[styles.container, gStyles.shadow_6]} onPress={handleOnPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: props.booking?.image }}
          alt={props.booking?.venue_name}
          resizeMethod="resize"
          style={styles.imagePortrait}
        />
        <View style={styles.heartIconContainer}>
          <HeartIcon />
        </View>
      </View>

      <View style={styles.content}>
        <View>
          <TextComponent size="24" color="dark" weight="bold" textAlign="left">
            {props.booking?.venue_name}
          </TextComponent>
        </View>

        <View style={styles.reservationContainer}>
          {props.booking?.detailPurch?.map((purch, index) => (
            <View key={`${index}-${purch.name_ticket}`}>
              <View style={styles.reserVationItem}>
                <View>
                  <TextComponent size="14" color="dark">
                    {`${purch.name_ticket} / $${formatToCurrency(purch.adult_unity_price)}`}
                  </TextComponent>
                  <View style={styles.row}>
                    <TextComponent size="14" color="muted">
                      {t(purch.child_number > 0 ? 'current_booking_card_children' : 'current_booking_card_people', { count: purch.adult_number + purch.child_number })}
                    </TextComponent>
                    {purch.child_number > 0 && <Image source={kid_icon} style={styles.dayPassIcon} />}
                  </View>
                </View>
              </View>
              {index < props.booking?.detailPurch.length - 1 && <DivisorComponent />}
            </View>
          ))}
        </View>

        <DivisorComponent />

        <View>
          <TextComponent size="12" color="dark">
            {props.booking?.date_reservation}
          </TextComponent>
          <TextComponent size="12" color="muted">
            {t('current_booking_card_id', { id: props.booking?.id_purch_code ?? '' })}
          </TextComponent>
        </View>
      </View>
    </Pressable>
  );
};

export default CurrentBookingCard;

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
