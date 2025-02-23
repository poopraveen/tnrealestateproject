

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../../locales/en/common.json';
import taTranslation from '../../locales/ta/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ta: { translation: taTranslation },
    },
    lng: 'en', // Set your default language to 'en'
    fallbackLng: 'en', // Fallback language when translation is missing
    detection: {
      // Disable URL path-based language detection
      order: ['localStorage', 'cookie'],
      caches: ['localStorage', 'cookie'],
      lookupLocalStorage: 'i18nextLng', // Use localStorage to store the language
      lookupCookie: 'i18nextLng', // Use cookie for language
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;


