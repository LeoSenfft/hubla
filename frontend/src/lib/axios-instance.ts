import axios from "axios";
import { getCookie } from "cookies-next";

const baseURL = process.env.API_URL;

const ApiClient = () => {
  const defaultOptions = {
    baseURL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    (config) => {
      const token = getCookie("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default ApiClient();
