import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './locales/en.json';
import it from './locales/it.json';

export const USER_PREFERRED_LANGUAGE = RNLocalize.getLocales()[0].languageCode;

const RESOURCES = {
  en: en,
  it: it,
};

i18n.use(initReactI18next).init({
  resources: RESOURCES,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
