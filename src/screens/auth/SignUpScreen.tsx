import { Alert, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';

import { AuthStackParamList } from '@app/navigation/stacks/AuthStack';

import { authActions } from '@app/store/slices/auth/auth.reducer';
import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { signUpUserService } from '@app/store/slices/auth/auth.service';

import FieldInputPassword from '@app/components/organisms/fields/FieldInputPassword';
import CheckboxComponent from '@app/components/molecules/checks/CheckboxComponent';
import FieldPhoneInput from '@app/components/organisms/fields/FieldPhoneInput';
import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';
import TextComponent from '@app/components/atoms/text/TextComponent';
import FieldBase from '@app/components/organisms/fields/FieldBase';
import ScreenView from '@app/components/molecules/screens/ScreenView';

import { normalizePixelSize } from '@app/utils/normalize';

import { EMAIL_REGEX, PASSWORD_REGEX } from '@app/config/constants';
import { IRegisterFormData } from '@app/types';
import { colors } from '@app/theme/colors';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: NavigationProp<AuthStackParamList>;
}

const SignUpScreen = (props: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IRegisterFormData>({
    reValidateMode: 'onBlur',
    defaultValues: {
      name: '',
      surname: '',
      mail: '',
      password: '',
      terms: false,
      phone: '',
      phone_code: '+34',
    },
  });
  const { error, isLoading, success } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleGoToSignIn = () => {
    props.navigation.navigate('SIGN_IN_SCREEN');
  };

  useFocusEffect(
    useCallback(
      () => {
        if (error) {
          Alert.alert(
            t('sign-up-screen-error-alert-title'),
            error,
            [
              {
                text: t('sign-up-screen-error-alert-accept'),
                onPress: () => {
                  dispatch(authActions.clean());
                },
                style: 'cancel',
              },
            ],
          );
        }
        if (success) {
          Alert.alert(
            t('sign-up-screen-success-alert-title'),
            success,
            [
              {
                text: t('sign-up-screen-success-alert-signin'),
                onPress: () => {
                  dispatch(authActions.clean());
                  props.navigation.navigate('SIGN_IN_SCREEN');
                },
                style: 'default',
              },
            ],
          );
        }
      },
      [dispatch, error, props.navigation, success, t],
    )
  );

  const handleSubmitRegister = async (values: IRegisterFormData) => {
    await dispatch(signUpUserService(values));
  };

  const handleGoToPrivacyPolice = () => {
    props.navigation.navigate('PRIVACY_POLICY_SCREEN');
  };

  const handleGoToTermsAndConditions = () => {
    props.navigation.navigate('TERMS_CONDITIONS_SCREEN');
  };

  return (
    <ScreenView contentContainerStyle={styles.scrollContent}>
      <TextComponent color="dark" size="16">{t('sign-up-screen-title')}</TextComponent>

      <View style={styles.section}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FieldBase
              input
              type="default"
              placeholder={t('sign-up-screen-name-placeholder')}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="name"
        />
        {errors.name && <TextComponent color="primary">{t('sign-up-screen-required')}</TextComponent>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FieldBase
              input
              type="default"
              placeholder={t('sign-up-screen-surname-placeholder')}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="surname"
        />
        {errors.surname && <TextComponent color="primary">{t('sign-up-screen-required')}</TextComponent>}

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
              placeholder={t('sign-up-screen-email-placeholder')}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="mail"
        />
        {errors.mail && <TextComponent color="primary">{t('sign-up-screen-required')}</TextComponent>}

        <Controller
          control={control}
          name="phone"
          rules={{
            required: t('sign-up-screen-phone-required'),
          }}
          render={({ field: { onChange, value } }) => (
            <FieldPhoneInput
              value={value}
              onChangeText={onChange}
              onChangeCountry={(country) => {
                setValue('phone_code', country.callingCode);
              }}
            />
          )}
        />
        {errors.phone && (
          <TextComponent color="primary">
            {errors.phone.message}
          </TextComponent>
        )}

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
              placeholder={t('sign-up-screen-password-placeholder')}
              autoCapitalize="none"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="password"
        />
        {errors.password && <TextComponent color="primary">{t('sign-up-screen-required')}</TextComponent>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.checkTerms}>
              <CheckboxComponent
                onChange={onChange}
                onBlur={onBlur}
                isActive={value}
              />
              <View style={styles.rowText}>
                <TextComponent size="14" color="dark">
                  {t('sign-up-screen-terms-accept')}
                </TextComponent>

                <TextComponent
                  size="14"
                  color="primary"
                  underline
                  weight="bold"
                  onPress={handleGoToTermsAndConditions}
                >
                  {t('sign-up-screen-terms-conditions')}
                </TextComponent>

                <TextComponent size="14" color="dark" underline={false}>
                  {t('sign-up-screen-terms-and')}
                </TextComponent>

                <TextComponent
                  size="14"
                  color="primary"
                  underline
                  weight="bold"
                  onPress={handleGoToPrivacyPolice}
                >
                  {t('sign-up-screen-privacy-policy')}
                </TextComponent>
              </View>
            </View>
          )}
          name="terms"
        />
        {errors.terms && <TextComponent color="primary">{t('sign-up-screen-required')}</TextComponent>}
      </View>

      <View style={styles.rowContentCenter}>
        <TextComponent
          size="14"
          textAlign="center"
        >
          {t('sign-up-screen-already-account')}
        </TextComponent>
        <TextComponent
          size="14"
          color="primary"
          weight="bold"
          textAlign="center"
          onPress={handleGoToSignIn}
        >
          {t('sign-up-screen-sign-in')}
        </TextComponent>
      </View>

      <ButtonComponent
        title={t('sign-up-screen-register-button')}
        disabled={!isValid || isLoading}
        isLoading={isLoading}
        onPress={handleSubmit(handleSubmitRegister)}
      />
    </ScreenView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {},
  scrollContent: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: normalizePixelSize(20),
    paddingVertical: 36,
    gap: 36,
  },
  section: {
    gap: 14,
  },
  rowContentCenter: {
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
  },
  checkTerms: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  rowText: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});
