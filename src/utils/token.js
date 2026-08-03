import { jwtDecode } from 'jwt-decode';
import { STORAGE_KEYS } from '../config';
import { getItem, removeItem, setItem } from './storage';

const ADMIN_PREVIEW_KEY = 'admin_preview_mode';

export const getAccessToken = () => getItem(STORAGE_KEYS.ACCESS_TOKEN);

export const setAccessToken = (token) => setItem(STORAGE_KEYS.ACCESS_TOKEN, token);

export const getRefreshToken = () => getItem(STORAGE_KEYS.REFRESH_TOKEN);

export const setRefreshToken = (token) => setItem(STORAGE_KEYS.REFRESH_TOKEN, token);

export const getStoredUser = () => {
  const rawUser = getItem(STORAGE_KEYS.USER);

  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

export const setStoredUser = (user) => setItem(STORAGE_KEYS.USER, JSON.stringify(user));

export const clearTokens = () => {
  removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  removeItem(STORAGE_KEYS.USER);
  removeItem(ADMIN_PREVIEW_KEY);
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

export const getUserRole = () => {
  const user = getStoredUser();
  return user?.role || user?.userRole || user?.data?.role || null;
};

export const isAdminUser = () => String(getUserRole() || '').toLowerCase() === 'admin';

export const isAdminPreviewEnabled = () => getItem(ADMIN_PREVIEW_KEY) === 'true';

export const enableAdminPreview = () => {
  setItem(ADMIN_PREVIEW_KEY, 'true');

  if (!getStoredUser()) {
    setStoredUser({
      id: 'preview-admin',
      fullName: 'Admin Preview',
      email: 'admin-preview@local.dev',
      role: 'admin',
    });
  }
};

export const disableAdminPreview = () => {
  removeItem(ADMIN_PREVIEW_KEY);
};

export const canAccessAdmin = () => isAdminUser() || isAdminPreviewEnabled();
