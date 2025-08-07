import { Alert, FlatList, ListRenderItem, RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

import { generalActions } from '@app/store/slices/general/general.slice';
import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { getGeneralLanguages, saveGeneralSelectedLanguage } from '@app/store/slices/general/general.service';

import SelectOptionWithIcon from '@app/components/molecules/selectors/SelectOptionWithIcon';
import TextComponent from '@app/components/atoms/text/TextComponent';
import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';

import { normalizePixelSize } from '@app/utils/normalize';

import { colors } from '@app/theme';
import { ILanguageMock } from '@app/types';

const LanguagesSettingScreen = () => {
  const dispatch = useAppDispatch();
  const {languages, languageSelected, isLoading} = useAppSelector(state => state.general);

  const { t } = useTranslation();

  const [language, setLanguage] = useState(languageSelected);

  const loadData = useCallback(
    () => {
      dispatch(getGeneralLanguages());
    },
    [dispatch],
  );


  useEffect(() => {
    let active = true;

    if (active) {
      loadData();
    }

    return () => {
      active = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleChangeLanuage = (lng: ILanguageMock) => {
    setLanguage(lng);
  };

  const handleSavelanguage = () => {
    Alert.alert(
      t('restart_title'),
      t('restart_message'),
      [
        {
          text: t('ok_button'),
          style: 'default',
          onPress: async () => {
            await dispatch(saveGeneralSelectedLanguage(language));
            dispatch(generalActions.setLanguageSelected(language));
            dispatch(generalActions.setLanguage(language.iso));
            RNRestart.restart();
          },
        },
      ],
    );
  };

  const renderItem: ListRenderItem<ILanguageMock> = ({item}) => {
    return (
      <SelectOptionWithIcon
        title={item.title}
        subtitle={item.subtitle}
        selected={item.id === language.id}
        icon={item.icon}
        onPress={() => handleChangeLanuage(item)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <TextComponent size="16">{t('language-setting-choose-language')}</TextComponent>
      </View>

      <FlatList
        data={languages}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id.toString()}`}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadData} />}
      />

      <View style={styles.footerBtn}>
        <ButtonComponent
          title={t('language-setting-save')}
          disabled={!language || isLoading}
          onPress={handleSavelanguage}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );

};

export default LanguagesSettingScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: normalizePixelSize(20, 'width'),
    paddingVertical: normalizePixelSize(20, 'height'),
  },
  listContent: {
    paddingHorizontal: normalizePixelSize(20, 'width'),
    // paddingVertical: normalizePixelSize(20, 'height'),
    // backgroundColor: colors.white,
    gap: normalizePixelSize(12, 'height'),
  },
  footerBtn: {
    paddingHorizontal: normalizePixelSize(20, 'width'),
  },
});
