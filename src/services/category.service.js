import axiosClient from './axiosClient';

const categoryService = {
  async getAll() {
    return axiosClient.get('/categories');
  },

  async getById(id) {
    return axiosClient.get(`/categories/${id}`);
  },

  async create(data) {
    return axiosClient.post('/categories', data);
  },

  async update(id, data) {
    return axiosClient.patch(`/categories/${id}`, data);
  },

  async remove(id) {
    return axiosClient.delete(`/categories/${id}`);
  },
};

export default categoryService;
