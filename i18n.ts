import * as RNLocalize from 'react-native-localize';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: RNLocalize.getLocales()[0].languageCode, // deveice language
    fallbackLng: 'en', // default
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
