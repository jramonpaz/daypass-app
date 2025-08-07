import { Alert, Linking, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { BookingsTabStackParamList } from '@app/navigation/BookingsTabStack';
import { useAppSelector } from '@app/hooks/redux.hook';

import CreditCardComponent from '@app/components/molecules/cards/CreditCardComponent';
import BookingHotelCard from './components/BookingHotelCard';
import DivisorComponent from '@app/components/molecules/divisor/DivisorComponent';
import TextComponent from '@app/components/atoms/text/TextComponent';
import SectionItems from '@app/components/molecules/SectionItems';
import BottomContainer from '@app/components/atoms/containers/BottomContainer';
import ButtonWithIcon from '@app/components/molecules/buttons/ButtonWithIcon';
import ActionsModalBase from '@app/components/organisms/modals/ActionsModalBase';

import { formatToCurrency } from '@app/utils/number.util';
import { normalizePixelSize } from '@app/utils/normalize';
import { call_outline_icon, map_point_outline_icon } from '@app/utils/images';

import { colors } from '@app/theme';

type Props = {
  navigation: NavigationProp<BookingsTabStackParamList>,
}

const BookingDetailScreen = (props: Props) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const { userDetail } = useAppSelector((state) => state.auth);
  const { bookingPurchaseSelected } = useAppSelector((state) => state.purchases);
  const {currencySelected} = useAppSelector(state => state.general);

  if (!userDetail || !bookingPurchaseSelected) {
    return (
      <View>
        <TextComponent size="16" color="dark">
          {t('booking_detail_screen_no_reservation_selected')}
        </TextComponent>
      </View>
    );
  }

  function handleConfirmCancelBooking() {
    props.navigation.navigate('CANCEL_BOOKING_TICKETS_SCREEN');
  }

  const handleOpenLoacionUrl = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=$${encodedAddress}`;

    Linking.openURL(mapUrl).catch(() => Alert.alert(t('booking_detail_screen_error'), t('booking_detail_screen_map_open_failed')));
  };

  const openPhoneApp = (phoneNumber: string) => {
    if (!phoneNumber || !/^\+?[0-9]+$/.test(phoneNumber)) {
      Alert.alert(t('booking_detail_screen_invalid_phone_number'), t('booking_detail_screen_phone_number_format_error'));
      return;
    }

    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl).catch(() => Alert.alert(t('booking_detail_screen_error'), t('booking_detail_screen_phone_app_open_failed')));
  };

  return (
    <View style={styles.main}>
      <ScrollView style={styles.main} contentContainerStyle={styles.scrollContent}>
        <BookingHotelCard booking={bookingPurchaseSelected} />

        <DivisorComponent />

        <SectionItems title={t('booking_detail_screen_contact_information')}>
          <View style={styles.sectionInner12}>
            <View>
              <TextComponent size="14" color="muted">{t('booking_detail_screen_name')}</TextComponent>
              <TextComponent size="16" color="dark">{userDetail?.name}</TextComponent>
            </View>

            <View>
              <TextComponent size="14" color="muted">{t('booking_detail_screen_surnames')}</TextComponent>
              <TextComponent size="16" color="dark">{userDetail?.surname}</TextComponent>
            </View>

            <View>
              <TextComponent size="14" color="muted">{t('booking_detail_screen_email')}</TextComponent>
              <TextComponent size="16" color="dark">{userDetail?.mail}</TextComponent>
            </View>

            <View>
              <TextComponent size="14" color="muted">{t('booking_detail_screen_phone')}</TextComponent>
              <TextComponent size="16" color="dark">
                {`${userDetail?.phone_code} ${userDetail?.phone}`}
              </TextComponent>
            </View>
          </View>
        </SectionItems>

        <DivisorComponent />

        <SectionItems title={t('booking_detail_screen_reservation_details')}>
          <View style={styles.sectionInner12}>
            {bookingPurchaseSelected.detailPurch.map((purch, index) => {
              const isChild = purch.child_number > 0;
              if (isChild) {
                const totalChild = purch.child_number * purch.child_unity_price;
                return (
                  <View style={styles.row} key={index}>
                    <TextComponent size="16" color="dark">
                      {`${purch.name_ticket} / $${formatToCurrency(purch.child_unity_price)} x ${purch.child_number}`}
                    </TextComponent>
                    <TextComponent size="16" color="dark">
                      {`$${totalChild}`}
                    </TextComponent>
                  </View>
                );
              }
              const totalAdult = purch.adult_unity_price * purch.adult_number;
              return (
                <View style={styles.row} key={index}>
                  <TextComponent size="16" color="dark" numberOfLines={2}>
                    {`${purch.name_ticket} / $${formatToCurrency(purch.adult_unity_price)} x ${purch.adult_number}`}
                  </TextComponent>
                  <TextComponent size="16" color="dark">
                    {`$${totalAdult}`}
                  </TextComponent>
                </View>
              );
            })}

            <View style={styles.row}>
              <TextComponent size="16" color="dark">{t('booking_detail_screen_tax')}</TextComponent>
              <TextComponent size="16" color="dark">
                {`${currencySelected.symbol}${formatToCurrency(bookingPurchaseSelected.tax)}`}
              </TextComponent>
            </View>

            <View style={styles.row}>
              <TextComponent size="16" color="dark" weight="bold">
                {t('booking_detail_screen_total')}
              </TextComponent>
              <TextComponent size="16" color="dark" weight="bold">
                {`${currencySelected.symbol}${formatToCurrency(bookingPurchaseSelected.total)}`}
              </TextComponent>
            </View>
          </View>
        </SectionItems>

        <DivisorComponent />

        <View style={styles.row}>
          <TextComponent size="16" color="dark" weight="bold">
            {t('booking_detail_screen_date')}
          </TextComponent>
          <TextComponent size="16" color="dark">
            {bookingPurchaseSelected.date_reservation}
          </TextComponent>
        </View>

        <DivisorComponent />

        <SectionItems title={t('booking_detail_screen_payment_method')}>
          <CreditCardComponent type="visa" lastnumbers="2970" />
        </SectionItems>

        <DivisorComponent />

        <TextComponent
          size="14"
          color="primary"
          weight="bold"
          underline
          onPress={() => setShowModal(true)}
        >
          {t('booking_detail_screen_cancel_reservation')}
        </TextComponent>
      </ScrollView>

      <BottomContainer showMargin showMarginH>
        <ButtonWithIcon
          title={t('booking_detail_screen_call_hotel')}
          leftImageSource={call_outline_icon}
          onPress={() => openPhoneApp(bookingPurchaseSelected.venue_contact_phone)}
        />

        <ButtonWithIcon
          theme="outline"
          title={t('booking_detail_screen_how_to_get')}
          leftImageSource={map_point_outline_icon}
          onPress={() => handleOpenLoacionUrl(bookingPurchaseSelected.venue_address)}
        />
      </BottomContainer>

      <ActionsModalBase
        actionsFullFill
        backGroundBluelight
        isVisible={showModal}
        setIsVisible={setShowModal}
        onConfirm={handleConfirmCancelBooking}
        message={t('booking_detail_screen_confirm_cancel_reservation')}
      />
    </View>
  );
};

export default BookingDetailScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    backgroundColor: colors.white,
    paddingHorizontal: normalizePixelSize(20, 'width'),
    paddingTop: normalizePixelSize(20, 'height'),
    paddingBottom: normalizePixelSize(60, 'height'),
    gap: normalizePixelSize(24, 'height'),
  },
  sectionInner16: {
    gap: normalizePixelSize(16, 'height'),
  },
  sectionInner12: {
    gap: normalizePixelSize(12, 'height'),
  },
  row: {
    flexDirection: 'row',
    justifyContent:'space-between',
    gap: 10,
  },
  rowItem: {
    flexGrow: 1,
    flexShrink: 1,
  },
});
