import { t } from "i18next";

export const REACT_VITE_THEME = "react-vite-theme";
export const REACT_VITE_LOCALE = "react-vite-locale";
export const REACT_VITE_CLOUD_MUSIC_BASE_URL =
  "https://vite-cloud-music-api.vercel.app";
export const GLOBAL_ERROR_MESSAGES: Record<string, string> = {
  500: t("errors.internal_server_error"),
};
