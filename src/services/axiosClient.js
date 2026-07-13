import axios from 'axios';
import { API_BASE_URL, ROUTES } from '../config';
import { clearTokens, getAccessToken } from '../utils/token';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Gắn Access Token vào mỗi request
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Xử lý response và lỗi 401
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      clearTokens();

      if (window.location.pathname !== ROUTES.LOGIN) {
        window.location.href = ROUTES.LOGIN;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
