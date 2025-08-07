/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerActions } from '@react-navigation/native';

import { useAppSelector } from '@app/hooks/redux.hook';
import { useTranslation } from 'react-i18next';

import ExploreScreen from '@app/screens/app/explore/welcome/ExploreScreen';
import NotificationScreen from '@app/screens/app/notifications/NotificationScreen';
import CheckoutConfirmScreen from '@app/screens/app/explore/checkout/CheckoutConfirmScreen';
import CheckoutScreen from '@app/screens/app/explore/checkout/CheckoutScreen';
import DaypassDetailScreen from '@app/screens/app/explore/daypass/DaypassDetailScreen';
import PrivacyPolicyScreen from '@app/screens/app/privacyPolicy/PrivacyPolicyScreen';
import ListingOfDaypassScreen from '@app/screens/app/explore/listing/ListingOfDaypassScreen';
import FAQsScreen from '@app/screens/app/FAQS/FAQsScreen';
import TermsAndConfitionsScreen from '@app/screens/app/termsCondition/TermsAndConfitionsScreen';

import MainAppHeader from '@app/components/organisms/header/MainAppHeader';
import LanguagesSettingScreen from '@app/screens/app/miscellaneous/LanguagesSettingScreen';
import CurrencySettingScreen from '@app/screens/app/miscellaneous/CurrencySettingScreen';
import MapSearchScreen from '@app/screens/app/explore/mapSearch/MapSearchScreen';

export type ExploreTabStackParamList = {
  // how tabs bar
  EXPLORE_TAB_SCREEN: undefined;
  // hide Tab bar
  LISTING_DAYPASS: undefined;
  DAYPASS_DETAIL_SCREEN: undefined;
  CHECKOUT_SCREEN: undefined;
  CHECKOUT_CONFIRM_SCREEN: undefined;
  NOTIFICATIONS_SCREEN: undefined;
  MAP_SEARCH_SCREEN: undefined;
  // miscellaneous
  PRIVACY_POLICY_SCREEN: undefined;
  FAQS_SCREEN: undefined;
  TERMS_CONDITIONS_SCREEN: undefined;

  LANGUAGES_SETTING_SCREEN: undefined;
  CURRENCY_SETTING_SCREEN: undefined
}

const Stack = createNativeStackNavigator<ExploreTabStackParamList>();

const ExploreTabStack = () => {
  const { isAuth, userDetail } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();

  const isLoggedIn = useMemo(() => isAuth && userDetail, [isAuth, userDetail]);

  return (
    <Stack.Navigator
      initialRouteName="EXPLORE_TAB_SCREEN"
      screenOptions={{
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="EXPLORE_TAB_SCREEN"
        component={ExploreScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              leftIconType="menu"
              titleType="appicon"
              rightIconType={isLoggedIn ? 'bell_active' : 'none'}
              onPressRightButton={() => {
                props.navigation.navigate('NOTIFICATIONS_SCREEN');
              }}
              onPressLeftButton={() =>
                props.navigation.dispatch(DrawerActions.openDrawer())
              }
            />
          ),
        }}
      />

      <Stack.Screen
        name="LISTING_DAYPASS"
        component={ListingOfDaypassScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="DAYPASS_DETAIL_SCREEN"
        component={DaypassDetailScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CHECKOUT_SCREEN"
        component={CheckoutScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              title={t('checkout-screen-title')}
              leftIconType="back"
              titleType="text"
              rightIconType="bell_active"
              onPressLeftButton={() => {
                if (props.navigation.canGoBack()) {
                  props.navigation.goBack();
                }
              }}
              onPressRightButton={() =>
                props.navigation.navigate('NOTIFICATIONS_SCREEN')
              }
            />
          ),
        }}
      />

      <Stack.Screen
        name="CHECKOUT_CONFIRM_SCREEN"
        component={CheckoutConfirmScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              titleType="appicon"
              rightIconType="none"
              leftIconType="none"
            />
          ),
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
              title={t('notifications-screen-title')}
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
              titleType="text"
              leftIconType="back"
              rightIconType="bell_active"
              title={t('privacy-policy-screen-title')}
              onPressLeftButton={() => {
                if (props.navigation.canGoBack()) {
                  props.navigation.goBack();
                }
              }}
              onPressRightButton={() =>
                props.navigation.navigate('NOTIFICATIONS_SCREEN')
              }
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
              title={t('faqs-screen-title')}
              onPressLeftButton={() => {
                props.navigation.goBack();
              }}
              onPressRightButton={() =>
                props.navigation.navigate('NOTIFICATIONS_SCREEN')
              }
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
              title={t('terms-conditions-screen-title')}
              onPressLeftButton={() => {
                props.navigation.goBack();
              }}
              onPressRightButton={() =>
                props.navigation.navigate('NOTIFICATIONS_SCREEN')
              }
            />
          ),
        }}
      />

      <Stack.Screen
        name="LANGUAGES_SETTING_SCREEN"
        component={LanguagesSettingScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              titleType="text"
              leftIconType="back"
              rightIconType={isLoggedIn ? 'bell_active' : 'none'}
              title={t('languages-setting-screen-title')}
              onPressLeftButton={() => {
                props.navigation.goBack();
              }}
              onPressRightButton={() =>
                props.navigation.navigate('NOTIFICATIONS_SCREEN')
              }
            />
          ),
        }}
      />

      <Stack.Screen
        name="CURRENCY_SETTING_SCREEN"
        component={CurrencySettingScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              titleType="text"
              leftIconType="back"
              rightIconType={isLoggedIn ? 'bell_active' : 'none'}
              title={t('currency-setting-screen-title')}
              onPressLeftButton={() => {
                props.navigation.goBack();
              }}
              onPressRightButton={() =>
                props.navigation.navigate('NOTIFICATIONS_SCREEN')
              }
            />
          ),
        }}
      />

      <Stack.Screen
        name="MAP_SEARCH_SCREEN"
        component={MapSearchScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ExploreTabStack;
