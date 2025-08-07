import { Alert, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AuthStackParamList } from '@app/navigation/stacks/AuthStack';

import { authRecoveryPasswordChangePasswordService } from '@app/store/slices/auth/auth.service';
import { authActions } from '@app/store/slices/auth/auth.reducer';
import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';

import ScreenView from '@app/components/molecules/screens/ScreenView';
import TextComponent from '@app/components/atoms/text/TextComponent';
import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';
import FieldInputPassword from '@app/components/organisms/fields/FieldInputPassword';

import { IChangePasswordFormData } from '@app/types';

type Props = {
  navigation: NavigationProp<AuthStackParamList>;
};

const NewPasswordScreen = (props: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IChangePasswordFormData>({
    reValidateMode: 'onBlur',
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  const passwordValue = watch('password');
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { error, success, tokenToRecoveryPass, isLoading } = useAppSelector((state) => state.auth);

  useFocusEffect(
    useCallback(
      () => {
        if (success) {
          Alert.alert(
            t('new-password-screen-success-alert-title'),
            success,
            [
              {
                text: t('new-password-screen-success-alert-accept'),
                style: 'default',
                onPress: () => {
                  dispatch(authActions.clean());
                  props.navigation.navigate('SIGN_IN_SCREEN');
                },
              },
            ],
          );
        } else if (error || !tokenToRecoveryPass) {
          Alert.alert(
            t('new-password-screen-error-alert-title'),
            error || t('new-password-screen-token-error'),
            [
              {
                text: t('new-password-screen-error-alert-accept'),
                style: 'default',
                onPress: () => {
                  props.navigation.navigate('PASSWORD_RECOVERY_SCREEN');
                },
              },
            ],
          );
        }
      },
      [error, success, tokenToRecoveryPass, dispatch, props.navigation, t],
    )
  );

  const handleChangePassword = async (form: IChangePasswordFormData) => {
    if (form.password === form.confirm_password && tokenToRecoveryPass) {
      await dispatch(authRecoveryPasswordChangePasswordService(form.password, tokenToRecoveryPass));
    }
  };

  return (
    <ScreenView justifyContent="space-between">
      <View style={styles.section40}>
        <TextComponent size="16">{t('new-password-screen-title')}</TextComponent>

        <View style={styles.section}>
          <Controller
            control={control}
            rules={{
              required: t('new-password-screen-password-required'),
              minLength: {
                value: 6,
                message: t('new-password-screen-password-min-length'),
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FieldInputPassword
                input
                type="password"
                label={t('new-password-screen-password-label')}
                autoCapitalize="none"
                placeholder={t('new-password-screen-password-placeholder')}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="password"
          />
          {errors.password && (
            <TextComponent color="primary">{errors.password.message}</TextComponent>
          )}

          <Controller
            control={control}
            rules={{
              required: t('new-password-screen-confirm-password-required'),
              minLength: {
                value: 6,
                message: t('new-password-screen-password-min-length'),
              },
              validate: (value) => value === passwordValue || t('new-password-screen-passwords-match-error'),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FieldInputPassword
                input
                type="password"
                label={t('new-password-screen-confirm-password-label')}
                autoCapitalize="none"
                placeholder={t('new-password-screen-confirm-password-placeholder')}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="confirm_password"
          />
          {errors.confirm_password && (
            <TextComponent color="primary">{errors.confirm_password.message}</TextComponent>
          )}
        </View>
      </View>

      <ButtonComponent
        title={t('new-password-screen-change-password-button')}
        disabled={!isValid || isLoading}
        onPress={handleSubmit(handleChangePassword)}
      />
    </ScreenView>
  );
};
export default NewPasswordScreen;

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  section40: {
    gap: 40,
  },
});
