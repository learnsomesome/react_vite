import { message } from "antd";
import axios from "axios";
import {
  GLOBAL_ERROR_MESSAGES,
  REACT_VITE_CLOUD_MUSIC_BASE_URL,
} from "./constant";

const io = axios.create({
  baseURL: REACT_VITE_CLOUD_MUSIC_BASE_URL,
  withCredentials: true,
  timeout: 30000,
});

io.interceptors.request.use(
  (config) => {
    console.log("interceptors request", config);

    return config;
  },
  (error) => {
    console.log("interceptors request error", error);
    window.$Loading.end();

    return Promise.reject(error);
  }
);

io.interceptors.response.use(
  (res) => {
    console.log("interceptors response", res);

    return res.data;
  },
  (error) => {
    console.log("interceptors response error", error);
    window.$Loading.end();

    error.globalErrorProcess = function () {
      const msg = error.message || GLOBAL_ERROR_MESSAGES[error.status];

      msg && message.error(msg);

      return Promise.reject(error);
    };

    if (error.config.hasOwnProperty("catch") && error.config.catch === true) {
      return Promise.reject(error);
    }

    return error.globalErrorProcess();
  }
);

export default io;
