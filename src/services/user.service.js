import axiosClient from './axiosClient';

const userService = {
  getProfile() {
    return axiosClient.get('/users/profile');
  },

  updateProfile(data) {
    return axiosClient.patch('/users/profile', data);
  },

  changePassword(data) {
    return axiosClient.patch('/users/change-password', data);
  },

  uploadAvatar(formData) {
    return axiosClient.post('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default userService;
