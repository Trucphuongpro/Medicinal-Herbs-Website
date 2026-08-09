import authService from './auth.service';
import axiosClient from './axiosClient';

const userService = {
  async getProfile() {
    return authService.getMe();
  },

  async getAll() {
    return axiosClient.get('/users');
  },

  async getById(id) {
    return axiosClient.get(`/users/${id}`);
  },

  async update(id, data) {
    return axiosClient.patch(`/users/${id}`, data);
  },

  async updateStatus(id, data) {
    return axiosClient.patch(`/users/${id}/status`, data);
  },
};

export default userService;
