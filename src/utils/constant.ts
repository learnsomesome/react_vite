import { t } from "i18next";

export const REACT_VITE_THEME = "react-vite-theme";
export const REACT_VITE_LOCALE = "react-vite-locale";
export const REACT_VITE_CLOUD_MUSIC_BASE_URL =
  "https://vite-cloud-music-api.vercel.app";
export const GLOBAL_ERROR_MESSAGES: Record<string, string> = {
  500: t("errors.internal_server_error"),
};
export enum SEARCH_TYPE {
  SINGLE = "1", // 单曲
  ALBUM = "10", // 专辑
  SINGER = "100", // 歌手
  SONG_LIST = "1000", // 歌单
  USER = "1002", // 用户
  MV = "1004", // MV
  LYRICS = "1006", // 歌词
  RADIO = "1009", // 电台
  VIDEO = "1014", // 视频
  COMPLEX = "1018", // 综合
  VIOCE = "2000", // 声音
}
export const SEARCH_OPTIONS = [
  { label: t("single"), value: SEARCH_TYPE.SINGLE },
  { label: t("song_list"), value: SEARCH_TYPE.SONG_LIST },
];
