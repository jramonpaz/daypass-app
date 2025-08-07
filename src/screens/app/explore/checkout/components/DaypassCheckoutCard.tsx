import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@app/hooks/redux.hook';

import HeartIcon from '@app/components/atoms/icons/HeartIcon';
import TextComponent from '@app/components/atoms/text/TextComponent';
import DivisorComponent from '@app/components/molecules/divisor/DivisorComponent';
import ImageComponent from '@app/components/atoms/icons/ImageComponent';

import { normalizePixelSize } from '@app/utils/normalize';
import { formatDate, parseDateStringToDate } from '@app/utils/dates.util';
import { map_point_outline_icon } from '@app/utils/images';
import { formatToCurrency } from '@app/utils/number.util';

import { colors } from '@app/theme';

const DaypassCheckoutCard = () => {

  const { hotelVenueDetail, hotelVenueImages, hotelVenuePurchaseResponse, purchaseTickets} = useAppSelector(state => state.hotels);
  const {searchFilterData} = useAppSelector(state => state.search);
  const { t } = useTranslation();

  // const image = daypassDetail.images[0];
  const imageURL = hotelVenueImages[0].image;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageComponent
          // source={image.url}
          source={{uri: imageURL}}
          // alt={image.caption}
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
            <TextComponent size="12" color="muted" numberOfLines={1}>
              {hotelVenueDetail?.address}
            </TextComponent>
          </View>

          <TextComponent size="24" color="dark" weight="bold" textAlign="left" numberOfLines={2}>
            {hotelVenueDetail?.name}
          </TextComponent>
        </View>

        <View style={styles.reservationContainer}>
          {purchaseTickets.map((ticket, index) => {
            const adultCount = t('daypass-checkout-card-adults', { count: ticket.adult_number });
            const childrenCount = t('daypass-checkout-card-children', { count: ticket.child_number });

            const peopleCount: string[] = [];

            if (ticket.adult_number > 0) {
              peopleCount.push(adultCount);
            }
            if (ticket.child_number > 0) {
              peopleCount.push(childrenCount);
            }
            return (
              <>
                <View
                  style={styles.reserVationItem}
                  key={`${index}-${ticket.id_venue_ticket}`}
                >
                  <View>
                    <TextComponent size="14" color="dark">
                      {`${ticket.ticketName} / $${formatToCurrency( ticket.fare, true)}`}
                    </TextComponent>
                    <TextComponent size="14" color="muted" >
                      {peopleCount.join(', ')}
                    </TextComponent>
                    {/* {ticket.child_number > 0 && (
                      <Image source={kid_icon} style={styles.dayPassIcon} />
                    )} */}
                  </View>
                  <Image source={require('@app/assets/images/bed1.png')} style={styles.reservationBedImage} />
                </View>
              </>
            );
          })}
        </View>

        <DivisorComponent />

        <View>
          <TextComponent size="14" color="dark">
            {formatDate(
              searchFilterData?.date_search
                ? parseDateStringToDate(searchFilterData?.date_search)
                : new Date()
              , 'D MMM YYYY')
            }
          </TextComponent>
          <TextComponent size="14" color="muted" >
            {`Id: ${hotelVenuePurchaseResponse?.shopping_cart_id}`}
          </TextComponent>
        </View>
      </View>
    </View>
  );
};

export default DaypassCheckoutCard;

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
