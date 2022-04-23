import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { locale_zh, locale_en } from "./locales";

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
  fallbackLng: "zh",
  lng: "zh",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
