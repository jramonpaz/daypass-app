import { Alert, Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { countries } from 'react-native-international-phone-number/lib/constants/countries';
import { useTranslation } from 'react-i18next';

import { AccountTabStackParamList } from '@app/navigation/stacks/AccountTabStack';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { getSesionUserDetail, updateProfileService } from '@app/store/slices/auth/auth.service';
import { authActions } from '@app/store/slices/auth/auth.reducer';

import FieldBase from '@app/components/organisms/fields/FieldBase';
import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';
import ActionsModalBase from '@app/components/organisms/modals/ActionsModalBase';
import TextComponent from '@app/components/atoms/text/TextComponent';
import FiledDatePicker from '@app/components/organisms/fields/FiledDatePicker';
import FieldPhoneInput from '@app/components/organisms/fields/FieldPhoneInput';
import SectionItems from '@app/components/molecules/SectionItems';
// import ChangePasswordForm from './components/ChangePasswordForm';
import FieldInputPassword from '@app/components/organisms/fields/FieldInputPassword';

import { normalizePixelSize } from '@app/utils/normalize';

import { formatDate } from '@app/utils/dates.util';
import { EMAIL_REGEX, MIN_BORN_DATE, PASSWORD_REGEX } from '@app/config/constants';

import { colors } from '@app/theme';
import { IUpdateProfileFormData, IUpdateProfilePasswordFormData, IUpdateProfilePayload } from '@app/types';

type NavigationProps = NavigationProp<AccountTabStackParamList>;

const UpdateAccountScreen = () => {
  const { t } = useTranslation();
  const [showActionModal, setShowActionModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { userDetail, isLoading, error, success } = useAppSelector(state => state.auth);
  const navigation = useNavigation<NavigationProps>();

  const countryCca2 = countries.find((country: any) => country.callingCode === `+${userDetail?.phone_code}`);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<IUpdateProfileFormData>({
    reValidateMode: 'onBlur',
    defaultValues: {
      name: '',
      surname: '',
      mail: '',
      birthdate: new Date(),
      phone: '',
      phone_code: userDetail ? `+${userDetail.phone_code}` : '+34',
    },
  });

  const {
    control: passControl,
    watch: passWatch,
    formState: { errors: passErrors, isValid: passIsValid },
  } = useForm<IUpdateProfilePasswordFormData>({
    mode: 'onChange',
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_new_password: '',
    },
  });

  const newPassword = passWatch('new_password');

  useEffect(() => {
    if (userDetail) {
      setValue('phone_code', `+${userDetail.phone_code}`);
      setValue('phone', userDetail.phone + '');
      setValue('name', userDetail.name);
      setValue('surname', userDetail.surname);
      setValue('mail', userDetail.mail);
    }
  }, [userDetail, setValue]);

  function handleEndSuccessUpdate() {
    dispatch(authActions.clean());
    setShowActionModal(false);
    navigation.navigate('PROFILE_SCREEN');
  }

  const handleUpdateProfile = async (values: IUpdateProfileFormData) => {
    const payload: IUpdateProfilePayload = {
      id_country: 1,
      name: values.name,
      surname: values.surname,
      phone_code: values.phone_code.slice(1),
      phone: values.phone.replaceAll(' ', ''),
    };

    await dispatch(updateProfileService(payload));

    if (passIsValid) {
      // TODO: manage the password update, now it is not possible because the endpoint does not exist.
    }
    await dispatch(getSesionUserDetail());
  };

  useFocusEffect(useCallback(
    () => {
      if (error) {
        Alert.alert(
          t('update_account_screen_error'),
          error,
          [
            {
              text: t('update_account_screen_accept'),
              style: 'default',
              onPress: () => {
                dispatch(authActions.clean());
              },
            },
          ],
        );
      }
      if (success) {
        setShowActionModal(true);
      }
    },
    [error, success, dispatch, t],
  ));

  return (
    <View style={styles.main}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <ScrollView
        style={styles.main}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Controller
            control={control}
            rules={{
              required: t('update_account_screen_required'),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FieldBase
                input
                type="default"
                label={t('update_account_screen_names')}
                placeholder={t('update_account_screen_names')}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
              />
            )}
            name="name"
          />
          {errors.name && <TextComponent color="primary">{errors.name.message || t('update_account_screen_required')}</TextComponent>}

          <Controller
            control={control}
            rules={{
              required: t('update_account_screen_required'),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FieldBase
                input
                type="default"
                label={t('update_account_screen_surnames')}
                placeholder={t('update_account_screen_surnames')}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
              />
            )}
            name="surname"
          />
          {errors.surname && <TextComponent color="primary">{errors.surname.message || t('update_account_screen_required')}</TextComponent>}

          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FiledDatePicker
                label={t('update_account_screen_birthdate')}
                placeholder={t('update_account_screen_birthdate')}
                value={value ? formatDate(value) : ''}
                dateFormat="D MMM YYYY"
                date={value ?? new Date()}
                minDate={new Date(MIN_BORN_DATE)}
                onBlur={onBlur}
                onChangeDate={(chosenDate: Date) => onChange(chosenDate)}
              />
            )}
            name="birthdate"
          />
          {errors.birthdate && <TextComponent size="12" color="primary">{errors.birthdate.message}</TextComponent>}

          <Controller
            control={control}
            name="phone"
            rules={{
              required: t('update_account_screen_phone_required'),
            }}
            render={({ field: { onChange, value } }) => (
              <FieldPhoneInput
                value={value}
                initialCountry={countryCca2 ? countryCca2.cca2 : 'ES'}
                onChangeText={onChange}
                onChangeCountry={(country) => setValue('phone_code', country.callingCode)}
              />
            )}
          />
          {errors.phone && <TextComponent color="primary">{errors.phone.message}</TextComponent>}

          <Controller
            control={control}
            rules={{
              required: t('update_account_screen_required'),
              pattern: EMAIL_REGEX,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FieldBase
                input
                type="email"
                autoCapitalize="none"
                disabled={true}
                placeholder={t('update_account_screen_email_placeholder')}
                label={t('update_account_screen_email_label')}
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
              />
            )}
            name="mail"
          />
          {errors.mail && <TextComponent color="primary">{errors.mail.message || t('update_account_screen_required')}</TextComponent>}

          <FieldBase
            input
            type="default"
            label={t('update_account_screen_city')}
            placeholder={t('update_account_screen_city')}
          />

          <FieldBase
            input
            type="default"
            label={t('update_account_screen_country')}
            placeholder={t('update_account_screen_country')}
          />
        </View>

        <SectionItems title={t('update_account_screen_change_password')}>
          <Controller
            control={passControl}
            rules={{
              required: t('update_account_screen_current_password_required'),
              minLength: { value: 6, message: t('update_account_screen_password_min_length') },
              pattern: {
                value: PASSWORD_REGEX,
                message: t('update_account_screen_password_requirements'),
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FieldInputPassword
                input
                type="password"
                placeholder={t('update_account_screen_current_password')}
                autoCapitalize="none"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
              />
            )}
            name="old_password"
          />
          {passErrors.old_password && <TextComponent color="primary">{passErrors.old_password.message}</TextComponent>}

          <Controller
            control={passControl}
            rules={{
              required: t('update_account_screen_new_password_required'),
              minLength: { value: 6, message: t('update_account_screen_password_min_length') },
              pattern: {
                value: PASSWORD_REGEX,
                message: t('update_account_screen_password_requirements'),
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FieldInputPassword
                input
                type="password"
                placeholder={t('update_account_screen_new_password')}
                autoCapitalize="none"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
              />
            )}
            name="new_password"
          />
          {passErrors.new_password && <TextComponent color="primary">{passErrors.new_password.message}</TextComponent>}

          <Controller
            control={passControl}
            rules={{
              required: t('update_account_screen_confirm_password_required'),
              validate: (value) => value === newPassword || t('update_account_screen_passwords_not_match'),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FieldInputPassword
                input
                type="password"
                placeholder={t('update_account_screen_confirm_new_password')}
                autoCapitalize="none"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
              />
            )}
            name="confirm_new_password"
          />
          {passErrors.confirm_new_password && <TextComponent color="primary">{passErrors.confirm_new_password.message}</TextComponent>}
        </SectionItems>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonComponent
          title={t('update_account_screen_save_changes')}
          isLoading={isLoading}
          disabled={(!isValid && !passIsValid) || isLoading}
          onPress={handleSubmit(handleUpdateProfile)}
        />
      </View>

      <ActionsModalBase
        isVisible={showActionModal}
        setIsVisible={setShowActionModal}
        confirmText={t('update_account_screen_close')}
        hideDissmissBtn
        actionShowCenter
        backGroundBluelight
        icon="success"
        onConfirm={handleEndSuccessUpdate}
        message={t('update_account_screen_success_message')}
      />
    </View>
  );
};

export default UpdateAccountScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    backgroundColor: colors.white,
    paddingHorizontal: normalizePixelSize(20, 'width'),
    paddingTop: normalizePixelSize(20, 'height'),
    paddingBottom:  normalizePixelSize(130, 'height'),
    gap: normalizePixelSize(36, 'height'),
    // position: 'relative',
  },
  section: {
    gap: normalizePixelSize(12, 'height'),
  },
  buttonContainer: {
    // flex: 1,
    position: 'absolute',
    bottom: normalizePixelSize(Platform.OS === 'ios' ? 32 : 20, 'height'),
    paddingHorizontal: normalizePixelSize(20, 'width'),
    width: '100%',
    // alignSelf: 'center',
    // backgroundColor: colors.red,
  },
});
