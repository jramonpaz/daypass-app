import { Alert, Image, Linking, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { AccountTabStackParamList } from '@app/navigation/stacks/AccountTabStack';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { logoutService } from '@app/store/slices/auth/auth.service';

import TextComponent from '@app/components/atoms/text/TextComponent';
import SectionItems from '@app/components/molecules/SectionItems';
import ItemNextAction from './components/ItemNextAction';

import { normalizePixelSize } from '@app/utils/normalize';
import {
  bell_dark_icon,
  call_outline_icon,
  dual_screen_outline_icon,
  logout_outline_icon,
  mail_outline_icon,
  payment_icon,
  person_circle_icon,
  question_outline_circle,
} from '@app/utils/images';

import { colors } from '@app/theme';
import { APP_MAIL_CONTACT, APP_NUMBER_CONTACT } from '@app/config/constants';
import { useTranslation } from 'react-i18next';
import { authActions } from '@app/store/slices/auth/auth.reducer';

type NavigationPropType = NavigationProp<AccountTabStackParamList>

const AccountScreen = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userDetail } = useAppSelector(state => state.auth);

  const navigation = useNavigation<NavigationPropType>();

  function goToFQAScreen() {
    navigation.navigate('FAQS_SCREEN');
  }

  function goToPrivacyPolicyScreen() {
    navigation.navigate('PRIVACY_POLICY_SCREEN');
  }

  function goToUpdateAccountScreen() {
    dispatch(authActions.clean());
    navigation.navigate('UPDATE_ACCOUNT_SCREEN');
  }

  function goToTermsAndConditionsScreen() {
    navigation.navigate('TERMS_CONDITIONS_SCREEN');
  }

  function handleOpenEmailContact() {
    const emailUrl = `mailto:${APP_MAIL_CONTACT}`;

    Linking.canOpenURL(emailUrl)
      .then((supported) => {
        if (!supported) {
          console.error('El dispositivo no puede manejar el enlace:', emailUrl);
          Alert.alert(t('account_screen_error'), t('account_screen_email_app_open_failed'));
        } else {
          return Linking.openURL(emailUrl);
        }
      })
      .catch((error) => {
        console.error(`Error al intentar abrir el enlace: ${emailUrl}`, error);
        Alert.alert(t('account_screen_error'), t('account_screen_email_app_open_problem'));
      });
  }

  const openWhatsApp = () => {
    const url = `whatsapp://send?phone=${APP_NUMBER_CONTACT}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert(t('account_screen_error'), t('account_screen_whatsapp_not_installed'));
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('Error al abrir WhatsApp: ', err));
  };

  const handleLogout = async () => {
    await dispatch(logoutService());
  };

  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <SafeAreaView style={[styles.main, styles.container]}>
        <View style={styles.headContainer}>
          <Image source={require('@app/assets/images/avatar.png')} style={styles.avatar} />
          <TextComponent weight="bold" size="24" textAlign="center" transform="capitalize">
            {userDetail ? `${userDetail.name} ${userDetail.surname}` : ''}
          </TextComponent>

          <Pressable style={styles.iconContainer} onPress={() => navigation.navigate('NOTIFICATIONS_SCREEN')}>
            <Image source={bell_dark_icon} style={styles.icon} />
          </Pressable>
        </View>

        <ScrollView style={styles.main} contentContainerStyle={styles.container}>

          <SectionItems title={t('account_screen_settings')}>
            <ItemNextAction
              label={t('account_screen_personal_info')}
              iconSource={person_circle_icon}
              onPress={goToUpdateAccountScreen}
            />
            <ItemNextAction
              label={t('account_screen_payment_info')}
              iconSource={payment_icon}
            />
            <ItemNextAction
              label={t('account_screen_logout')}
              iconSource={logout_outline_icon}
              onPress={handleLogout}
            />
          </SectionItems>

          <SectionItems title={t('account_screen_contact')}>
            <ItemNextAction
              label={t('account_screen_email')}
              iconSource={mail_outline_icon}
              onPress={handleOpenEmailContact}
            />
            <ItemNextAction
              label={t('account_screen_phone')}
              iconSource={call_outline_icon}
              onPress={openWhatsApp}
            />
            <ItemNextAction
              label={t('account_screen_faqs')}
              iconSource={question_outline_circle}
              onPress={goToFQAScreen}
            />
          </SectionItems>

          <SectionItems title={t('account_screen_legal')}>
            <ItemNextAction
              label={t('account_screen_terms_and_conditions')}
              iconSource={dual_screen_outline_icon}
              onPress={goToTermsAndConditionsScreen}
            />
            <ItemNextAction
              label={t('account_screen_privacy_policy')}
              iconSource={dual_screen_outline_icon}
              onPress={goToPrivacyPolicyScreen}
            />
            <ItemNextAction
              label={t('account_screen_legal_notice')}
              iconSource={dual_screen_outline_icon}
            />
          </SectionItems>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AccountScreen;

const ICON_SIZE = normalizePixelSize(24,'height');

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
    // alignItems: 'center',
  },
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: normalizePixelSize(20),
    paddingTop: normalizePixelSize(10, 'height'),
    paddingBottom: normalizePixelSize(40),
    gap: normalizePixelSize(36, 'height'),
  },
  headContainer: {
    // gap: normalizePixelSize(20, 'height'),
    paddingTop: normalizePixelSize(20, 'height'),
  },
  avatar: {
    width: normalizePixelSize(60, 'height'),
    height: normalizePixelSize(60, 'height'),
    borderRadius: normalizePixelSize(60),
    // marginBottom: normalizePixelSize(20),
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: colors.blueSecondary,
    // overflow: 'hidden',
    backgroundColor: colors.light,
    marginBottom: 10,
  },
  iconContainer: {
    position: 'absolute',
    right: normalizePixelSize(20, 'width'),
    top: normalizePixelSize(10, 'height'),
    width: 24,
    height: ICON_SIZE,
    // flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // borderIcons: {
  //   width: ICON_SIZE,
  //   height: ICON_SIZE,
  //   resizeMode: 'contain',
  // },
  icon: {
    width: 24,
    height: ICON_SIZE,
    resizeMode: 'contain',
  },
});
