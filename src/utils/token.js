import { jwtDecode } from 'jwt-decode';
import { STORAGE_KEYS } from '../config';
import { getItem, removeItem, setItem } from './storage';

export const getAccessToken = () => getItem(STORAGE_KEYS.ACCESS_TOKEN);

export const setAccessToken = (token) => setItem(STORAGE_KEYS.ACCESS_TOKEN, token);

export const getRefreshToken = () => getItem(STORAGE_KEYS.REFRESH_TOKEN);

export const setRefreshToken = (token) => setItem(STORAGE_KEYS.REFRESH_TOKEN, token);

export const clearTokens = () => {
  removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  removeItem(STORAGE_KEYS.USER);
};

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const isAuthenticated = () => isTokenValid(getAccessToken());
