import axios from "axios";
import { REACT_VITE_CLOUD_MUSIC_BASE_URL } from "./constant";

const io = axios.create({
  timeout: 30000,
  baseURL: REACT_VITE_CLOUD_MUSIC_BASE_URL,
});

io.defaults.withCredentials = true;

io.interceptors.response.use(
  (res) => {
    console.log("interceptors response", res);

    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default io;
