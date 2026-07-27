import authService from './auth.service';

const userService = {
  async getProfile() {
    return authService.getMe();
  },
};

export default userService;
