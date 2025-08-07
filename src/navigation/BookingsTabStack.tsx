/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@app/hooks/redux.hook';

import BookingsScreen from '@app/screens/app/bookings/BookingsScreen';
import NotificationScreen from '@app/screens/app/notifications/NotificationScreen';
import CancelBookingTicketsScreen from '@app/screens/app/bookings/CancelBookingTicketsScreen';
import BookingDetailScreen from '@app/screens/app/bookings/BookingDetailScreen';
import NoAuthScreen from '@app/screens/app/auth/NoAuthScreen';
import PrivacyPolicyScreen from '@app/screens/app/privacyPolicy/PrivacyPolicyScreen';
import FAQsScreen from '@app/screens/app/FAQS/FAQsScreen';
import TermsAndConfitionsScreen from '@app/screens/app/termsCondition/TermsAndConfitionsScreen';

import MainAppHeader from '@app/components/organisms/header/MainAppHeader';

export type BookingsTabStackParamList = {
  // show tabBar for this screens
  BOOKINGS_TAB_SCREEN: undefined;
  // hide tabBar for this screens
  BOOKING_DETAIL_SCREEN: undefined;
  CANCEL_BOOKING_TICKETS_SCREEN: undefined;
  NOTIFICATIONS_SCREEN: undefined;
  // auth
  NO_AUTH_SCREEN: undefined;
  // miscellaneous
  FAQS_SCREEN: undefined;
  TERMS_CONDITIONS_SCREEN: undefined;
  PRIVACY_POLICY_SCREEN: undefined;
}

const Stack = createNativeStackNavigator<BookingsTabStackParamList>();

const BookingsTabStack = () => {
  const { t } = useTranslation();
  const { isAuth, userDetail } = useAppSelector((state) => state.auth);

  const isLoggedIn = useMemo(() => isAuth && userDetail, [isAuth, userDetail]);
  return (
    <Stack.Navigator
      initialRouteName={'BOOKINGS_TAB_SCREEN'}
      screenOptions={{
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="NO_AUTH_SCREEN"
        component={NoAuthScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              titleType="text"
              title={t('login')}
              rightIconType="none"
            />
          ),
        }}
      />

      <Stack.Screen
        name="BOOKINGS_TAB_SCREEN"
        component={BookingsScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              title={t('bookings')}
              titleType="text"
              leftIconType="menu"
              onPressLeftButton={() => props.navigation.dispatch(DrawerActions.openDrawer())}
              rightIconType="bell_active"
              onPressRightButton={() => props.navigation.navigate('NOTIFICATIONS_SCREEN')}
            />
          ),
        }}
      />

      <Stack.Screen
        name="BOOKING_DETAIL_SCREEN"
        component={BookingDetailScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              leftIconType="back"
              rightIconType="bell_active"
              titleType="text"
              title={t('booking_details')}
              onPressLeftButton={() => {
                if (props.navigation.canGoBack()) {
                  props.navigation.goBack();
                }
              }}
              onPressRightButton={() => props.navigation.navigate('NOTIFICATIONS_SCREEN')}
            />
          ),
        }}
      />

      <Stack.Screen
        name="CANCEL_BOOKING_TICKETS_SCREEN"
        component={CancelBookingTicketsScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="NOTIFICATIONS_SCREEN"
        component={NotificationScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              leftIconType="back"
              titleType="text"
              title={t('notifications')}
              onPressLeftButton={() => {
                if (props.navigation.canGoBack()) {
                  props.navigation.goBack();
                }
              }}
              rightIconType="none"
            />
          ),
        }}
      />

      <Stack.Screen
        name="PRIVACY_POLICY_SCREEN"
        component={PrivacyPolicyScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              leftIconType="back"
              onPressLeftButton={() => props.navigation.goBack()}
              titleType="appicon"
            />
          ),
        }}
      />

      <Stack.Screen
        name="FAQS_SCREEN"
        component={FAQsScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              titleType="text"
              leftIconType="back"
              rightIconType={isLoggedIn ? 'bell_active' : 'none'}
              title={t('faqs')}
              onPressLeftButton={() => {
                props.navigation.goBack();
              }}
              onPressRightButton={() => props.navigation.navigate('NOTIFICATIONS_SCREEN')}
            />
          ),
        }}
      />

      <Stack.Screen
        name="TERMS_CONDITIONS_SCREEN"
        component={TermsAndConfitionsScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              titleType="text"
              leftIconType="back"
              rightIconType={isLoggedIn ? 'bell_active' : 'none'}
              title={t('terms_and_conditions')}
              onPressLeftButton={() => {
                props.navigation.goBack();
              }}
              onPressRightButton={() => props.navigation.navigate('NOTIFICATIONS_SCREEN')}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};


export default BookingsTabStack;

// const ICON_HEIGHT = 24;
// const HEADER_HEIGHT = Platform.OS === 'ios' ? ICON_HEIGHT * 2 : ICON_HEIGHT;

// const styles = StyleSheet.create({
//   iconContainer: {
//     // width: 24,
//     height: HEADER_HEIGHT,
//     // flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   icon: {
//     width: 24,
//     height: HEADER_HEIGHT,
//     resizeMode: 'contain',
//     // flexGrow: 1,
//   },
// });
