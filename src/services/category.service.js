import axiosClient from './axiosClient';

const categoryService = {
  async getAll() {
    return axiosClient.get('/categories');
  },

  async getById(id) {
    return axiosClient.get(`/categories/${id}`);
  },
};

export default categoryService;
