import { FlatList, ListRenderItem, RefreshControl, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@app/hooks/redux.hook';
import { generalActions } from '@app/store/slices/general/general.slice';
import { getGeneralCurrencies, saveGeneralCurrencySelected } from '@app/store/slices/general/general.service';

import SelectOptionWithIcon from '@app/components/molecules/selectors/SelectOptionWithIcon';
import TextComponent from '@app/components/atoms/text/TextComponent';
import ButtonComponent from '@app/components/molecules/buttons/ButtonComponent';

import { normalizePixelSize } from '@app/utils/normalize';

import { ICurrency } from '@app/types';
import { colors } from '@app/theme';

const CurrencySettingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {currencies, currencySelected, isLoading} = useAppSelector(state => state.general);

  const { t } = useTranslation();
  const [currency, setCurrency] = useState(currencySelected);

  const loadData = useCallback(
    () => {
      dispatch(getGeneralCurrencies());
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

  const handleChangeCurrency = (newCurrency: ICurrency) => {
    setCurrency(newCurrency);
  };

  const handleSaveCurrency = async () => {
    await dispatch(saveGeneralCurrencySelected(currency));
    dispatch(generalActions.setCurrencySelected(currency));
    dispatch(generalActions.setCurrency(currency.iso));
    navigation.goBack();
  };

  const renderItem: ListRenderItem<ICurrency> = ({item}) => {
    return (
      <SelectOptionWithIcon
        title={item.title}
        subtitle={item.subtitle}
        selected={item.id === currency.id}
        icon={item.icon}
        onPress={() => handleChangeCurrency(item)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <TextComponent size="16">{t('currency-setting-choose-currency')}</TextComponent>
      </View>

      <FlatList
        data={currencies}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id.toString()}`}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadData} />}
      />

      <View style={styles.footerBtn}>
        <ButtonComponent
          title={t('currency-setting-save')}
          disabled={!currency || isLoading}
          onPress={handleSaveCurrency}
          isLoading={isLoading}
        />
      </View>
    </SafeAreaView>
  );

};

export default CurrencySettingScreen;

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
