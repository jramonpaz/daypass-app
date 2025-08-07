/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import { DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@app/hooks/redux.hook';

import FavoritiesScreen from '@app/screens/app/favorites/FavoritiesScreen';
import NotificationScreen from '@app/screens/app/notifications/NotificationScreen';
import NoAuthScreen from '@app/screens/app/auth/NoAuthScreen';
import FAQsScreen from '@app/screens/app/FAQS/FAQsScreen';
import TermsAndConfitionsScreen from '@app/screens/app/termsCondition/TermsAndConfitionsScreen';
import PrivacyPolicyScreen from '@app/screens/app/privacyPolicy/PrivacyPolicyScreen';

import MainAppHeader from '@app/components/organisms/header/MainAppHeader';

export type FavoritiesStackParamList = {
  FAVORITIES_SCREEN: undefined;
  NOTIFICATIONS_SCREEN: undefined;
  // auth
  NO_AUTH_SCREEN: undefined;
  // miscellaneous
  FAQS_SCREEN: undefined;
  TERMS_CONDITIONS_SCREEN: undefined;
  PRIVACY_POLICY_SCREEN: undefined;
}

const Stack = createNativeStackNavigator<FavoritiesStackParamList>();

const FavoritiesStack = () => {
  const { t } = useTranslation();
  const { isAuth, userDetail } = useAppSelector(state => state.auth);

  const isLoggedIn = useMemo(() => isAuth && userDetail, [isAuth, userDetail]);

  return (
    <Stack.Navigator
      initialRouteName={'FAVORITIES_SCREEN'}
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
              leftIconType="back"
              titleType="text"
              title={t('favorities_stack_login')}
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
        name="FAVORITIES_SCREEN"
        component={FavoritiesScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              title={t('favorities_stack_favorites')}
              titleType="text"
              leftIconType="menu"
              rightIconType="bell_active"
              onPressLeftButton={() => props.navigation.dispatch(DrawerActions.openDrawer())}
              onPressRightButton={() => props.navigation.navigate('NOTIFICATIONS_SCREEN')}
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
              title={t('favorities_stack_notifications')}
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
        name="FAQS_SCREEN"
        component={FAQsScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              titleType="text"
              leftIconType="back"
              rightIconType={isLoggedIn ? 'bell_active' : 'none'}
              title={t('favorities_stack_faqs')}
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
              title={t('favorities_stack_terms_and_conditions')}
              onPressLeftButton={() => {
                props.navigation.goBack();
              }}
              onPressRightButton={() => props.navigation.navigate('NOTIFICATIONS_SCREEN')}
            />
          ),
        }}
      />

      <Stack.Screen
        name="PRIVACY_POLICY_SCREEN"
        component={PrivacyPolicyScreen}
        options={({ navigation }) => ({
          header: (props) => (
            <MainAppHeader
              {...props}
              leftIconType="back"
              onPressLeftButton={() => navigation.goBack()}
              titleType="appicon"
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default FavoritiesStack;

