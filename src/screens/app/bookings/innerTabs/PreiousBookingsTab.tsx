import { Alert, RefreshControl, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { BookingsTabStackParamList } from '@app/navigation/BookingsTabStack';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { purchasesActions } from '@app/store/slices/bookings/bokkings.slice';
import { getOldDetailPurchaseservice } from '@app/store/slices/bookings/bookings.service';

import TextComponent from '@app/components/atoms/text/TextComponent';
import CurrentBookingCard from '../components/CurrentBookingCard';

import { normalizePixelSize } from '@app/utils/normalize';

import { colors } from '@app/theme';
import { IBookingsPurchasesDetail } from '@app/types';

type NavBarNavigationProp = NavigationProp<BookingsTabStackParamList>;

const PreviousBookingsTab = () => {
  const { oldBookingsPurchasesDetail, isLoading, error } = useAppSelector(state => state.purchases);
  const { t } = useTranslation();
  const navigation = useNavigation<NavBarNavigationProp>();

  const dispatch = useAppDispatch();

  const loadData = useCallback(
    async () => {
      await dispatch(getOldDetailPurchaseservice());
    },
    [dispatch],
  );

  useEffect(() => {
    let isActive = true;

    if (isActive) {
      loadData();
    }
    return () => {
      isActive = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(
      () => {
        if (error) {
          Alert.alert(
            t('previous-bookings-screen-error-alert-title'),
            error,
            [
              {
                text: t('previous-bookings-screen-error-alert-accept'),
                style: 'default',
                onPress: () => {
                  dispatch(purchasesActions.clean());
                },
              },
            ],
          );
        }
      },
      [error, dispatch, t],
    )
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
      <StatusBar
        backgroundColor={colors.primary}
        animated={true}
        barStyle={'light-content'}
      />

      {!isLoading && oldBookingsPurchasesDetail.length === 0 && (
        <View>
          <TextComponent size="18" color="muted" textAlign="center">
            {t('previous-bookings-screen-no-bookings')}
          </TextComponent>
        </View>
      )}
      {oldBookingsPurchasesDetail.map((booking, index) => (
        <CurrentBookingCard
          key={`${index}-${booking.id_purch_code}-${booking.id_purch}-${Date.now()}`}
          booking={booking}
          onPress={handleGoToBookingDetail}
        />
      ))}
    </ScrollView>
  );
};
export default PreviousBookingsTab;

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
