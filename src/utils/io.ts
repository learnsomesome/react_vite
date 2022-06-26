import { message } from "antd";
import axios from "axios";
import { t } from "i18next";
import { REACT_VITE_CLOUD_MUSIC_BASE_URL } from "./constant";

let loadingCount = 0;

const startLoading = () => {
  setTimeout(() => {
    message.loading({
      key: "io",
      content: t("common.loading"),
      duration: 0,
    });
  }, 500);
};

const endLoading = () => {
  message.destroy("io");
};

const startLoadingAddCount = () => {
  if (loadingCount === 0) {
    startLoading();
  }

  loadingCount++;
};

const endLoadingSubCount = () => {
  loadingCount--;

  if (loadingCount === 0) {
    endLoading();
  }
};

const io = axios.create({
  baseURL: REACT_VITE_CLOUD_MUSIC_BASE_URL,
  withCredentials: true,
  timeout: 30000,
});

io.interceptors.request.use(
  (config) => {
    console.log("interceptors request", config);
    if (config.loading) {
      startLoadingAddCount();
    }

    return config;
  },
  (error) => {
    console.log("interceptors request error", error);
    if (error.config.loading) {
      endLoadingSubCount();
    }

    return Promise.reject(error);
  }
);

io.interceptors.response.use(
  (res) => {
    console.log("interceptors response", res);
    if (res.config.loading) {
      endLoadingSubCount();
    }

    return res.data;
  },
  (error) => {
    console.log("interceptors response error", error);
    if (error.config.loading) {
      endLoadingSubCount();
    }

    error.globalErrorProcess = function () {
      if (this.response.status === 401) {
      }

      return Promise.reject(this);
    };

    if (error.config.hasOwnProperty("catch") && error.config.catch === true) {
      return Promise.reject(error);
    }

    return error.globalErrorProcess();
  }
);

export default io;
