import axiosClient from './axiosClient';

const productService = {
  async getAll(params) {
    return axiosClient.get('/products', { params });
  },

  async getById(id) {
    return axiosClient.get(`/products/${id}`);
  },
};

export default productService;
