import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { Alert, StyleSheet, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthStackParamList } from '@app/navigation/stacks/AuthStack';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { authRecoveryPasswordSendCodeService, authRecoveryPasswordValidateCodeService } from '@app/store/slices/auth/auth.service';
import { authActions } from '@app/store/slices/auth/auth.reducer';

import ScreenView from '@app/components/molecules/screens/ScreenView';
import TextComponent from '@app/components/atoms/text/TextComponent';
import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';
import FieldCodeInput from '@app/components/organisms/fields/FieldCodeInput';

import { IRecoveryPasswordFormData } from '@app/types';

type Props = {
  navigation: NavigationProp<AuthStackParamList>;
};

const CELL_COUNT = 4;

const CodeValidationScreen = (props: Props) => {
  const [codeValidation, setCodeValidation] = useState<string>('');
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { error, isLoading, success, recoveryPassForm, isValidCode } = useAppSelector(
    (state) => state.auth
  );

  useFocusEffect(
    useCallback(() => {
      if (isValidCode) {
        props.navigation.navigate('NEW_PASSWORD_SCREEN');
      }

      if (success) {
        Alert.alert(
          t('code-validation-success-title'),
          success,
          [
            {
              text: t('code-validation-success-accept'),
              style: 'default',
              onPress: () => {
                setCodeValidation('');
              },
            },
          ],
        );
      }

      if (error) {
        Alert.alert(
          t('code-validation-error-title'),
          error,
          [
            {
              text: t('code-validation-error-accept'),
              style: 'default',
              onPress: () => {
                setCodeValidation('');
              },
            },
          ],
        );
      }
    }, [error, success, isValidCode, props.navigation, t]),
  );

  const handleValidateCode = async () => {
    if (codeValidation.length === CELL_COUNT && recoveryPassForm?.mail) {
      await dispatch(
        authRecoveryPasswordValidateCodeService(codeValidation, recoveryPassForm.mail)
      );
    }
  };

  async function reSendCode() {
    setCodeValidation('');
    if (recoveryPassForm?.mail) {
      const payload: IRecoveryPasswordFormData = {
        mail: recoveryPassForm.mail,
      };

      dispatch(authActions.setRecoveryPassForm(payload));
      await dispatch(authRecoveryPasswordSendCodeService(payload));
    }
  }

  return (
    <ScreenView justifyContent="space-between">
      <View style={styles.section}>
        <TextComponent size="16">
          {t('code-validation-title', { email: recoveryPassForm?.mail || t('your-email'),  cells: CELL_COUNT })}
        </TextComponent>

        <View style={styles.codeSection}>
          <FieldCodeInput
            value={codeValidation}
            setValue={setCodeValidation}
            cellCount={CELL_COUNT}
          />

          <View style={styles.h32}>
            <TextComponent
              size="16"
              color="primary"
              weight="bold"
              textAlign="center"
              onPress={reSendCode}
            >
              {t('code-validation-resend-code')}
            </TextComponent>
          </View>
        </View>
      </View>

      <ButtonComponent
        title={t('code-validation-confirm-button')}
        disabled={codeValidation.length !== CELL_COUNT || isLoading}
        isLoading={isLoading}
        onPress={handleValidateCode}
      />
    </ScreenView>
  );
};

export default CodeValidationScreen;

const styles = StyleSheet.create({
  section: {
    gap: 40,
  },
  codeSection: {
    gap: 12,
  },
  h32: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
