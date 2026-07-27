import axiosClient from './axiosClient';

const authService = {
  async login(credentials) {
    return axiosClient.post('/auth/login', credentials);
  },

  async register(data) {
    return axiosClient.post('/auth/register', data);
  },

  async getMe() {
    return axiosClient.get('/auth/me');
  },
};

export default authService;
