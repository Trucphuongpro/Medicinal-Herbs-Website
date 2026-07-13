import axiosClient from './axiosClient';

const authService = {
  login(credentials) {
    return axiosClient.post('/auth/login', credentials);
  },

  register(data) {
    return axiosClient.post('/auth/register', data);
  },

  logout() {
    return axiosClient.post('/auth/logout');
  },

  refreshToken(refreshToken) {
    return axiosClient.post('/auth/refresh', { refreshToken });
  },

  forgotPassword(email) {
    return axiosClient.post('/auth/forgot-password', { email });
  },

  resetPassword(data) {
    return axiosClient.post('/auth/reset-password', data);
  },

  getProfile() {
    return axiosClient.get('/auth/profile');
  },
};

export default authService;
