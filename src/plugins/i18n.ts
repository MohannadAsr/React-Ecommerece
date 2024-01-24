// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import de from '../localization/en.json';
import ar from '../localization/ar.json';

const language = localStorage.getItem('current-lang');
const parsedLang = language ? JSON.parse(language) : 'de';

i18n.use(initReactI18next).init({
  resources: {
    de: de,
    ar: ar,
  },
  lng: parsedLang,
  fallbackLng: 'de',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
