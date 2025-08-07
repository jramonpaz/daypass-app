import { ActivityIndicator, Alert, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { getGeneralTermsConditions } from '@app/store/slices/general/general.service';
import { generalActions } from '@app/store/slices/general/general.slice';

import TextComponent from '@app/components/atoms/text/TextComponent';
import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';
import SectionItems from '@app/components/molecules/SectionItems';

import { normalizePixelSize } from '@app/utils/normalize';

import { colors } from '@app/theme';

const TermsAndConfitionsScreen = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { error, isLoading, termsAndConditions } = useAppSelector(state => state.general);

  const loadData = useCallback(async () => {
    if (!termsAndConditions) {
      dispatch(getGeneralTermsConditions());
    }
  }, [dispatch, termsAndConditions]);

  useEffect(() => {
    let isActive = true;

    if (isActive && !termsAndConditions) {
      loadData();
    }
    return () => {
      isActive = false;
    };
  }, [loadData, termsAndConditions]);

  useFocusEffect(useCallback(() => {
    if (error) {
      Alert.alert(
        t('terms_and_conditions_screen_error'),
        error,
        [
          {
            text: t('terms_and_conditions_screen_accept'),
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
            {error}
          </TextComponent>
          <ButtonComponent title={t('terms_and_conditions_screen_reload')} />
        </View>
      )}
      {!isLoading && !error && termsAndConditions && (
        termsAndConditions.map((item, index) => (
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

export default TermsAndConfitionsScreen;

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
