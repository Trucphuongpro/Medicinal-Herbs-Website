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

    // Chi xu ly khi nguoi dung TUNG co token, nghia la phien da het han.
    // Khach chua dang nhap cung nhan 401, nhung do la truong hop binh thuong
    // va tung man hinh tu moi ho dang nhap - khong duoc da ho di dau ca.
    if (status === 401 && getAccessToken()) {
      clearTokens();

      if (window.location.pathname !== ROUTES.LOGIN) {
        const redirectTo = `${ROUTES.LOGIN}?expired=1&from=${encodeURIComponent(
          window.location.pathname,
        )}`;
        window.location.replace(redirectTo);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
