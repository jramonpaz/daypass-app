import { ActivityIndicator, Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import WebView from 'react-native-webview';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@app/hooks/redux.hook';

import TextComponent from '@app/components/atoms/text/TextComponent';

import { normalizePixelSize } from '@app/utils/normalize';

import { EN_PRIVACY_POLICES, ES_PRIVACY_POLICES } from '@app/config/constants';
import { colors } from '@app/theme';

const DetailPoliceWebViewTab = () => {
  const { t } = useTranslation();

  const [loadign, setLoadign] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { language } = useAppSelector(state => state.general);

  const url = useMemo(() => {
    return language === 'en' ? EN_PRIVACY_POLICES : ES_PRIVACY_POLICES;
  }, [language]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
        animated={true}
        showHideTransition={'slide'}
      />
      {loadign && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} size={normalizePixelSize(24)} />
          <TextComponent color="muted" size="14" textAlign="center">
            {t('detail-police-webview-loading')}
          </TextComponent>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <TextComponent color="muted" size="14" textAlign="center">
            {t('detail-police-webview-error')}
          </TextComponent>
        </View>
      )}

      <WebView
        source={{ uri: url }}
        style={styles.webview}
        onLoadStart={() => {
          setError(false);
          setLoadign(true);
        }}
        onLoadEnd={() => setLoadign(false)}
        onError={() => setError(true)}
      />
    </View>
  );
};

export default DetailPoliceWebViewTab;

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  webview: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    flex: 1,
    // width: '100%',
    // height: '100%',
    // backgroundColor: colors.light,
    // backgroundColor: 'green',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalizePixelSize(20, 'width'),
    paddingVertical: normalizePixelSize(48, 'width'),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: normalizePixelSize(20, 'width'),
    paddingVertical: normalizePixelSize(48, 'width'),
  },
});
