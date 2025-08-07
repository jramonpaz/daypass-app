import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions, CompositeScreenProps } from '@react-navigation/native';

import { ExploreTabStackParamList } from '@app/navigation/ExploreTabStack';
import { NavBarBottomTabParams } from '@app/navigation/NavBarBottom';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';

import TextComponent from '@app/components/atoms/text/TextComponent';
import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';
import DaypassCheckoutCard from './components/DaypassCheckoutCard';

import { normalizePixelSize } from '@app/utils/normalize';
import { checkmark_icon } from '@app/utils/images';

import { colors } from '@app/theme';
import { IGetAllBookingsPurchasesRequest } from '@app/types';
import { calculateFutureDate, formatDate } from '@app/utils/dates.util';
import { getDetailPurchaseservice } from '@app/store/slices/bookings/bookings.service';
import { useTranslation } from 'react-i18next';


type Props = CompositeScreenProps<
  NativeStackScreenProps<ExploreTabStackParamList, 'CHECKOUT_CONFIRM_SCREEN'>,
  NativeStackScreenProps<NavBarBottomTabParams>
>;

const CheckoutConfirmScreen = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { userDetail } = useAppSelector(state => state.auth);
  const { executePurchaseResponse, executePurchaseAnonymousRequest } = useAppSelector(state => state.hotels);
  const { language } = useAppSelector(state => state.general);

  async function handleGoToBookingsScreen () {
    if (executePurchaseResponse) {
      // reset navigation state screens
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'EXPLORE_TAB_SCREEN' }],
        })
      );

      // reload data in bookings to update view data
      const date = calculateFutureDate(3, 'months');
      const payload: IGetAllBookingsPurchasesRequest = {
        date_to: formatDate(date, 'YYYYMMDD'),
        date_from: '',
        id_purch_code_user: '',
        lang: language,
      };
      dispatch(getDetailPurchaseservice(payload));

      props.navigation.navigate('BOOKINGS_TAB_STACK', {
        screen: 'BOOKINGS_TAB_SCREEN',
      });
    } else {
      Alert.alert(
        t('checkout-confirm-screen-error-title'),
        t('checkout-confirm-screen-error-message'),
        [
          {
            text: t('checkout-confirm-screen-error-ok'),
            onPress: () => props.navigation.navigate('EXPLORE_TAB_SCREEN'),
          },
        ],
        { cancelable: false }
      );
    }
  }

  return (
    <View style={styles.main}>
      <ScrollView style={styles.main} contentContainerStyle={styles.content}>
        <Image style={styles.checkIcon} source={checkmark_icon} />

        <View style={styles.title}>
          <TextComponent color="white" size="24" textAlign="center" weight="bold">
            {t('checkout-confirm-screen-title')}
          </TextComponent>
          <TextComponent color="white" size="14" textAlign="center">
            {t('checkout-confirm-screen-email-sent-to', {
              email: userDetail?.mail ?? executePurchaseAnonymousRequest?.user_mail ?? '',
            })}
          </TextComponent>
        </View>

        <DaypassCheckoutCard />

        <View style={styles.bottomContainer}>
          <ButtonComponent
            title={t('checkout-confirm-screen-view-booking')}
            theme="bluelight"
            onPress={handleGoToBookingsScreen}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CheckoutConfirmScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    backgroundColor: colors.primary,
    paddingVertical: normalizePixelSize(24, 'height'),
    paddingBottom: normalizePixelSize(20, 'height'),
    paddingHorizontal: normalizePixelSize(20, 'width'),
    gap: normalizePixelSize(24, 'height'),
  },
  checkIcon: {
    width: normalizePixelSize(48, 'height'),
    height: normalizePixelSize(48, 'height'),
    tintColor: colors.blueSecondary,
    marginBottom: 10,
    alignSelf: 'center',
  },
  title: {
    gap: normalizePixelSize(20, 'height'),
    paddingHorizontal: normalizePixelSize(40, 'height'),
  },
  bottomContainer: {
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    flexDirection: 'column',
    flex: 1,
    // alignSelf: 'center',
    paddingVertical: normalizePixelSize(40, 'height'),
    // paddingBottom: normalizePixelSize(Platform.OS === 'ios' ? 32 : 20, 'height'),
    // paddingHorizontal: normalizePixelSize(20, 'width'),
  },
});
