/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@app/hooks/redux.hook';

import SignInScreen from '@app/screens/auth/SignInScreen';
import SignUpScreen from '@app/screens/auth/SignUpScreen';
import CodeValidationScreen from '@app/screens/auth/CodeValidationScreen';
import NewPasswordScreen from '@app/screens/auth/NewPasswordScreen';
import PasswordRecoveryScreen from '@app/screens/auth/PasswordRecoveryScreen';
import PrivacyPolicyScreen from '@app/screens/app/privacyPolicy/PrivacyPolicyScreen';
import TermsAndConfitionsScreen from '@app/screens/app/termsCondition/TermsAndConfitionsScreen';

import MainAppHeader from '@app/components/organisms/header/MainAppHeader';

export type AuthStackParamList = {
  SIGN_IN_SCREEN: undefined;
  SIGN_UP_SCREEN: undefined;
  PASSWORD_RECOVERY_SCREEN: undefined;
  CODE_VALIDATION_SCREEN: undefined;
  NEW_PASSWORD_SCREEN: undefined;
  PRIVACY_POLICY_SCREEN: undefined;
  TERMS_CONDITIONS_SCREEN: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  const { t } = useTranslation();
  const { isAuth, userDetail } = useAppSelector((state) => state.auth);

  const isLoggedIn = useMemo(() => isAuth && userDetail, [isAuth, userDetail]);

  return (
    <Stack.Navigator
      initialRouteName="SIGN_IN_SCREEN"
      screenOptions={{
        animation: 'slide_from_right',
        // animationDuration: 100,
      }}
    >
      <Stack.Screen
        name="SIGN_IN_SCREEN"
        component={SignInScreen}
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
        name="SIGN_UP_SCREEN"
        component={SignUpScreen}
        options={{

          header: (props) => (
            <MainAppHeader
              {...props}
              leftIconType="back"
              onPressLeftButton={() => props.navigation.goBack()}
              titleType="text"
              title={t('auth_stack_register')}
            />
          ),
        }}
      />

      <Stack.Screen
        name="PASSWORD_RECOVERY_SCREEN"
        component={PasswordRecoveryScreen}
        options={{

          header: (props) => (
            <MainAppHeader
              {...props}
              leftIconType="back"
              onPressLeftButton={() => props.navigation.goBack()}
              titleType="text"
              title={t('auth_stack_forgot_password')}
            />
          ),
        }}
      />

      <Stack.Screen
        name="CODE_VALIDATION_SCREEN"
        component={CodeValidationScreen}
        options={{

          header: (props) => (
            <MainAppHeader
              {...props}
              leftIconType="back"
              onPressLeftButton={() => props.navigation.goBack()}
              titleType="text"
              title={t('auth_stack_verify_email')}
            />
          ),
        }}
      />

      <Stack.Screen
        name="NEW_PASSWORD_SCREEN"
        component={NewPasswordScreen}
        options={{

          header: (props) => (
            <MainAppHeader
              {...props}
              leftIconType="back"
              onPressLeftButton={() => props.navigation.goBack()}
              titleType="text"
              title={t('auth_stack_new_password')}
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
              rightIconType="none"
              title={t('auth_stack_privacy_policy')}
              onPressLeftButton={() => {
                if (props.navigation.canGoBack()) {
                  props.navigation.goBack();
                }
              }}
              // onPressRightButton={() =>
              //   props.navigation.navigate('NOTIFICATIONS_SCREEN')
              // }
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

export default AuthStack;
