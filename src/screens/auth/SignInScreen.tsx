import { Alert, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  CompositeNavigationProp,
  NavigationProp,
  useFocusEffect,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import { GoogleSignin, SignInResponse } from '@react-native-google-signin/google-signin';
// import Auth0, { useAuth0 } from 'react-native-auth0';

import { AuthStackParamList } from '@app/navigation/stacks/AuthStack';
import { NavBarBottomTabParams } from '@app/navigation/NavBarBottom';

import { authGoogleSignInService, getUserDetails, signInUserService } from '@app/store/slices/auth/auth.service';
import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { authActions } from '@app/store/slices/auth/auth.reducer';

import ScreenView from '@app/components/molecules/screens/ScreenView';
import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';
import TextComponent from '@app/components/atoms/text/TextComponent';
import FieldBase from '@app/components/organisms/fields/FieldBase';
import SocialMediaBtn from '@app/components/molecules/buttons/SocialMediaBtn';
import FieldInputPassword from '@app/components/organisms/fields/FieldInputPassword';

import { normalizePixelSize } from '@app/utils/normalize';
import { EMAIL_REGEX, PASSWORD_REGEX } from '@app/config/constants';
import { mail_outline_icon } from '@app/utils/images';

import { colors } from '@app/theme/colors';
import { IGoogleSignInPayload, ILoginFormData } from '@app/types';

type NavigationType = CompositeNavigationProp<
  NavigationProp<NavBarBottomTabParams>,
  NavigationProp<AuthStackParamList>
>;

const SignInScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginFormData>({
    reValidateMode: 'onBlur',
    defaultValues: {
      mail: '',
      password: '',
    },
  });

  GoogleSignin.configure({
    iosClientId: '116617320924-0hdl0dcgtcameao7pl2nntlbe2a9nbv7.apps.googleusercontent.com',
  });

  const { t } = useTranslation();
  const navigation = useNavigation<NavigationType>();
  const dispatch = useAppDispatch();
  const { error, isLoading, success} = useAppSelector(state => state.auth);
  const { prevNavigation } = useAppSelector(state => state.navigation);

  // const {authorize} = useAuth0();

  // const auth0 = new Auth0({
  //   domain: 'dev-nm043p8j6ititiru.us.auth0.com',
  //   clientId: 'mRcWVZBIQulZ0rsEyzVX6uUf7HKxk82d',
  // });


  const onPressGoogleSignIn = async () => {
    try {
      // Iniciar sesión con Google
      await GoogleSignin.hasPlayServices();
      const response: SignInResponse = await GoogleSignin.signIn();
      if (response.type === 'success') {
        const userInfo = response.data;
        const payload: IGoogleSignInPayload = {
          is_mobile: true,
          mail: userInfo.user.email,
          name: userInfo.user.givenName ?? '',
          surname: userInfo.user.familyName ?? '',
        };

        await dispatch(authGoogleSignInService(payload));
        // Alert.alert('Login Success', `Token: ${JSON.stringify(payload)}`);
      }
    } catch (e) {
      console.error(e);
      Alert.alert(
        t('sign-in-screen-login-error-title'),
        e.message || t('sign-in-screen-login-error-message')
      );
    }
  };

  const handleSignUp = () => {
    dispatch(authActions.clean());
    navigation.navigate('SIGN_UP_SCREEN');
  };

  const handlePasswordRecovery = () => {
    dispatch(authActions.clean());
    navigation.navigate('PASSWORD_RECOVERY_SCREEN');
  };

  useFocusEffect(
    useCallback(() => {
      // for now the success callback is called when user is logged with google account
      if (success && prevNavigation) {
        dispatch(getUserDetails());
        const targetRoute = prevNavigation.routeNames[1];
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routeNames: prevNavigation.routeNames,
            routes: prevNavigation.routeNames.map(r => ({
              name: r,
              params: {},
            })),
          })
        );

        navigation.dispatch(
          CommonActions.navigate(targetRoute)
        );
      }

      if (error) {
        Alert.alert(
          t('sign-in-screen-error-title'),
          error,
          [
            {
              text: t('sign-in-screen-error-accept'),
              style: 'default',
              onPress: () => {
                dispatch(authActions.clean());
              },
            },
          ],
        );
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, success, dispatch])
  );

  const handleSignIn = async (values: ILoginFormData) => {
    const resp = await dispatch(signInUserService(values));
    if (resp && prevNavigation) {
      await dispatch(getUserDetails());
      const targetRoute = prevNavigation.routeNames[1];
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routeNames: prevNavigation.routeNames,
          routes: prevNavigation.routeNames.map(r => ({
            name: r,
            params: {},
          })),
        })
      );

      navigation.dispatch(
        CommonActions.navigate(targetRoute)
      );
    }
  };

  return (
    <ScreenView contentContainerStyle={styles.scrollContent}>
      <TextComponent size="16">{t('sign-in-screen-title')}</TextComponent>

      <View style={styles.section}>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: EMAIL_REGEX,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FieldBase
              input
              type="email"
              autoCapitalize="none"
              placeholder={t('sign-in-screen-email-placeholder')}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              label={t('sign-in-screen-email-label')}
              leftImage={mail_outline_icon}
            />
          )}
          name="mail"
        />
        {errors.mail && <TextComponent color="primary">{t('sign-in-screen-required')}</TextComponent>}

        <Controller
          control={control}
          rules={{
            required: true,
            pattern: PASSWORD_REGEX,
            minLength: 6,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FieldInputPassword
              input
              type="password"
              label={t('sign-in-screen-password-label')}
              autoCapitalize="none"
              placeholder={t('sign-in-screen-password-placeholder')}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="password"
        />
        {errors.password && <TextComponent color="primary">{t('sign-in-screen-required')}</TextComponent>}

        <ButtonComponent
          title={t('sign-in-screen-access-button')}
          disabled={!isValid || isLoading}
          isLoading={isLoading}
          onPress={handleSubmit(handleSignIn)}
        />

        <View style={styles.pv12}>
          <TextComponent
            size="14"
            textAlign="center"
            onPress={handlePasswordRecovery}
          >
            {t('sign-in-screen-forgot-password')}
          </TextComponent>
        </View>

        <View style={styles.rowContent}>
          <View style={styles.divisor} />
          <TextComponent size="14" textAlign="center">{t('sign-in-screen-or')}</TextComponent>
          <View style={styles.divisor} />
        </View>

        <SocialMediaBtn
          title={t('sign-in-screen-continue-google')}
          socialType="google"
          onPress={onPressGoogleSignIn}
        />

      </View>

      <View style={styles.rowContentCenter}>
        <TextComponent
          size="14"
          textAlign="center"
        >
          {t('sign-in-screen-no-account')}
        </TextComponent>
        <TextComponent
          size="14"
          color="primary"
          weight="bold"
          textAlign="center"
          onPress={handleSignUp}
        >
          {t('sign-in-screen-register')}
        </TextComponent>
      </View>
    </ScreenView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  scroll: {},
  scrollContent: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: normalizePixelSize(20),
    paddingVertical: 40,
    gap: 40,
  },
  section: {
    gap: 12,
    top: -8,
  },
  rowContent: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    height: 51,
  },
  divisor: {
    height: 1,
    backgroundColor: colors.lowlight,
    flex: 1,
  },
  rowContentCenter: {
    gap: 12,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
  },
  pv12: {
    height: 34,
    justifyContent: 'center',
  },
});
