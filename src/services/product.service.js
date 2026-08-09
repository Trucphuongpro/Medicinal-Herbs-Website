import axiosClient from './axiosClient';

const productService = {
  async getAll(params) {
    return axiosClient.get('/products', { params });
  },

  async getById(id) {
    return axiosClient.get(`/products/${id}`);
  },

  async create(data) {
    return axiosClient.post('/products', data);
  },

  async update(id, data) {
    return axiosClient.patch(`/products/${id}`, data);
  },

  async remove(id) {
    return axiosClient.delete(`/products/${id}`);
  },
};

export default productService;
