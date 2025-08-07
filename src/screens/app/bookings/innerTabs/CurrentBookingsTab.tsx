import { Alert, RefreshControl, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { BookingsTabStackParamList } from '@app/navigation/BookingsTabStack';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { purchasesActions } from '@app/store/slices/bookings/bokkings.slice';
import { getDetailPurchaseservice } from '@app/store/slices/bookings/bookings.service';

import TextComponent from '@app/components/atoms/text/TextComponent';
import CurrentBookingCard from '../components/CurrentBookingCard';

import { normalizePixelSize } from '@app/utils/normalize';

import { calculateFutureDate, formatDate } from '@app/utils/dates.util';

import { colors } from '@app/theme';
import { IBookingsPurchasesDetail, IGetAllBookingsPurchasesRequest } from '@app/types';

type NavBarNavigationProp = NavigationProp<BookingsTabStackParamList>;

const CurrentBookingsTab = () => {
  const { t } = useTranslation();
  const { bookingsPurchasesDetail, isLoading, error } = useAppSelector((state) => state.purchases);
  const { language } = useAppSelector(state => state.general);

  const navigation = useNavigation<NavBarNavigationProp>();

  const dispatch = useAppDispatch();

  const loadData = useCallback(async () => {
    const date = calculateFutureDate(3, 'months');
    const payload: IGetAllBookingsPurchasesRequest = {
      date_to: formatDate(date, 'YYYYMMDD'),
      date_from: '',
      id_purch_code_user: '',
      lang: language,
    };
    await dispatch(getDetailPurchaseservice(payload));
  }, [dispatch, language]);

  useEffect(() => {
    let isActive = true;

    if (isActive) {
      loadData();
    }
    return () => {
      isActive = false;
    };
  }, [loadData]);

  useFocusEffect(
    useCallback(() => {
      if (error) {
        Alert.alert(
          t('error'),
          error,
          [
            {
              text: t('accept'),
              style: 'default',
              onPress: () => {
                dispatch(purchasesActions.clean());
              },
            },
          ],
        );
      }
    }, [error, dispatch, t]),
  );

  function handleGoToBookingDetail(booking: IBookingsPurchasesDetail) {
    dispatch(purchasesActions.setBookingPurchaseSelected(booking));
    navigation.navigate('BOOKING_DETAIL_SCREEN');
  }

  return (
    <ScrollView
      style={styles.main}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadData} />}
    >
      <StatusBar backgroundColor={colors.primary} animated={true} barStyle={'light-content'} />

      {!isLoading && bookingsPurchasesDetail.length === 0 && (
        <View>
          <TextComponent size="18" color="muted" textAlign="center">
            {t('no_reservations')}
          </TextComponent>
        </View>
      )}
      {bookingsPurchasesDetail.map((booking, index) => (
        <CurrentBookingCard
          key={`${index}-${booking.id_purch_code}-${booking.id_purch}-${Date.now()}`}
          booking={booking}
          onPress={handleGoToBookingDetail}
        />
      ))}
    </ScrollView>
  );
};

export default CurrentBookingsTab;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.light,
  },
  scrollContent: {
    backgroundColor: colors.light,
    paddingHorizontal: normalizePixelSize(20, 'width'),
    paddingVertical: normalizePixelSize(20, 'height'),
    gap: normalizePixelSize(48, 'height'),
  },
  cardEmpty: {
    // backgroundColor: colors.gray,
    padding: normalizePixelSize(20, 'width'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalizePixelSize(20, 'height'),
  },
});
