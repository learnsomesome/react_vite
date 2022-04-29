import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { REACT_VITE_LOCALE } from "../utils/constant";
import { locale_zh, locale_en } from "./locales";

const defaultLocale = window.localStorage.getItem(REACT_VITE_LOCALE) || "zh";

const resources = {
  zh: {
    translation: locale_zh,
  },
  en: {
    translation: locale_en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: defaultLocale,
  lng: defaultLocale,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
