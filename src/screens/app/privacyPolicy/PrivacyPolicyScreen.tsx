import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { generalActions } from '@app/store/slices/general/general.slice';
import { getGeneralPolPrivacy } from '@app/store/slices/general/general.service';

import SectionItems from '@app/components/molecules/SectionItems';
import TextComponent from '@app/components/atoms/text/TextComponent';
import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';

import { normalizePixelSize } from '@app/utils/normalize';

import { colors } from '@app/theme';
import { useTranslation } from 'react-i18next';

const PrivacyPolicyScreen = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { error, isLoading, privacyPolices } = useAppSelector(state => state.general);

  const loadData = useCallback(async () => {
    if (!privacyPolices) {
      dispatch(getGeneralPolPrivacy());
    }
  }, [dispatch, privacyPolices]);

  useEffect(() => {
    let isActive = true;

    if (isActive && !privacyPolices) {
      loadData();
    }
    return () => {
      isActive = false;
    };
  }, [loadData, privacyPolices]);

  useFocusEffect(useCallback(() => {
    if (error) {
      Alert.alert(
        t('privacy_policy_screen_error'),
        error,
        [
          {
            text: t('privacy_policy_screen_accept'),
            style: 'default',
            onPress: () => {
              dispatch(generalActions.clean());
            },
          },
        ],
      );
    }
  }, [error, dispatch, t]));

  return (
    <ScrollView style={styles.main} contentContainerStyle={styles.content}>
      <StatusBar backgroundColor={colors.primary} animated={true} barStyle={'light-content'} />
      {isLoading && <ActivityIndicator size={24} color={colors.dark} />}
      {!isLoading && error && (
        <View>
          <TextComponent size="14" color="dark" style={styles.paragraph}>
            {t('privacy_policy_screen_load_error')}
          </TextComponent>
          <ButtonComponent title={t('privacy_policy_screen_reload')} />
        </View>
      )}
      {!isLoading && !error && privacyPolices && (
        privacyPolices.map((item, index) => (
          <SectionItems title={item.title} key={`${index}-${item.title}`}>
            <TextComponent size="14" color="dark" style={styles.paragraph}>
              {item.description}
            </TextComponent>
          </SectionItems>
        ))
      )}
    </ScrollView>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    gap: normalizePixelSize(24, 'height'),
    paddingHorizontal: normalizePixelSize(20, 'width'),
    paddingBottom: normalizePixelSize(40, 'height'),
    paddingTop: normalizePixelSize(20, 'height'),
  },
  paragraph: {
    lineHeight: normalizePixelSize(20, 'height'),
  },
});
