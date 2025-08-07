/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import PrivacyPolicyScreen from '@app/screens/app/privacyPolicy/PrivacyPolicyScreen';
import UpdateAccountScreen from '@app/screens/app/account/UpdateAccountScreen';
import NotificationScreen from '@app/screens/app/notifications/NotificationScreen';
import AccountScreen from '@app/screens/app/account/AccountScreen';
import FAQsScreen from '@app/screens/app/FAQS/FAQsScreen';
import TermsAndConfitionsScreen from '@app/screens/app/termsCondition/TermsAndConfitionsScreen';

import MainAppHeader from '@app/components/organisms/header/MainAppHeader';

export type AccountTabStackParamList = {
  // show tabBar on screens
  PROFILE_SCREEN: undefined;
  // hide tabBar on screens
  FAQS_SCREEN: undefined;
  PRIVACY_POLICY_SCREEN: undefined;
  TERMS_CONDITIONS_SCREEN: undefined;
  UPDATE_ACCOUNT_SCREEN: undefined;
  NOTIFICATIONS_SCREEN: undefined;
}

const Stack = createNativeStackNavigator<AccountTabStackParamList>();

const AccountTabStack = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="PROFILE_SCREEN"
      screenOptions={{
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="PROFILE_SCREEN"
        component={AccountScreen}
        options={{
          headerShown: false,
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
              rightIconType="bell_active"
              title={t('account_tab_stack_faqs')}
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
        name="PRIVACY_POLICY_SCREEN"
        component={PrivacyPolicyScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              titleType="text"
              leftIconType="back"
              rightIconType="bell_active"
              title={t('account_tab_stack_privacy_policy')}
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
        name="UPDATE_ACCOUNT_SCREEN"
        component={UpdateAccountScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              titleType="text"
              leftIconType="back"
              rightIconType="bell_active"
              title={t('account_tab_stack_edit_profile')}
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
        name="NOTIFICATIONS_SCREEN"
        component={NotificationScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              leftIconType="back"
              titleType="text"
              title={t('account_tab_stack_notifications')}
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
        name="TERMS_CONDITIONS_SCREEN"
        component={TermsAndConfitionsScreen}
        options={{
          header: (props) => (
            <MainAppHeader
              {...props}
              titleType="text"
              leftIconType="back"
              rightIconType="bell_active"
              title={t('account_tab_stack_terms_and_conditions')}
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
    </Stack.Navigator>
  );
};

export default AccountTabStack;
