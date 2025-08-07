import { Alert, StyleSheet, View } from 'react-native';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthStackParamList } from '@app/navigation/stacks/AuthStack';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { authRecoveryPasswordSendCodeService } from '@app/store/slices/auth/auth.service';
import { authActions } from '@app/store/slices/auth/auth.reducer';

import FieldBase from '@app/components/organisms/fields/FieldBase';
import TextComponent from '@app/components/atoms/text/TextComponent';
import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';
import ScreenView from '@app/components/molecules/screens/ScreenView';

import { mail_outline_icon } from '@app/utils/images';
import { EMAIL_REGEX } from '@app/config/constants';
import { IRecoveryPasswordFormData } from '@app/types';

type Props = {
  navigation: NavigationProp<AuthStackParamList>;
}

const PasswordRecoveryScreen = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IRecoveryPasswordFormData>({
    reValidateMode: 'onBlur',
    defaultValues: {
      mail: '',
    },
  });

  const dispatch = useAppDispatch();
  const { error, isLoading, success } = useAppSelector((state) => state.auth);
  const { t } = useTranslation(); // Initialize useTranslation

  useFocusEffect(
    useCallback(() => {
      if (success) {
        props.navigation.navigate('CODE_VALIDATION_SCREEN');
      }
      if (error) {
        Alert.alert(
          t('password-recovery-error-title'),
          error,
          [
            {
              text: t('password-recovery-error-accept'),
              style: 'default',
              onPress: () => {
                dispatch(authActions.clean());
              },
            },
          ],
        );
      }
    }, [error, dispatch, props.navigation, success, t]),
  );

  const handleSendCodeRecovery = async (values: IRecoveryPasswordFormData) => {
    await dispatch(authRecoveryPasswordSendCodeService(values));
  };

  return (
    <ScreenView paddingH="20" justifyContent="space-between">
      <View style={styles.section}>
        <TextComponent size="16">{t('password-recovery-title')}</TextComponent>

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
              placeholder={t('password-recovery-email-placeholder')}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              label={t('password-recovery-email-placeholder')} // Use the same key for the label
              leftImage={mail_outline_icon}
            />
          )}
          name="mail"
        />
        {errors.mail && <TextComponent color="primary">{t('password-recovery-required')}</TextComponent>}
      </View>

      <ButtonComponent
        title={t('password-recovery-send-button')}
        disabled={!isValid || isLoading}
        isLoading={isLoading}
        onPress={handleSubmit(handleSendCodeRecovery)}
      />
    </ScreenView>
  );
};
export default PasswordRecoveryScreen;

const styles = StyleSheet.create({
  section: {
    gap: 40,
  },
});
