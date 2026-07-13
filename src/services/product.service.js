import axiosClient from './axiosClient';

const productService = {
  getAll(params) {
    return axiosClient.get('/products', { params });
  },

  getById(id) {
    return axiosClient.get(`/products/${id}`);
  },

  search(params) {
    return axiosClient.get('/products/search', { params });
  },

  getFeatured() {
    return axiosClient.get('/products/featured');
  },

  getByCategory(categoryId, params) {
    return axiosClient.get(`/products/category/${categoryId}`, { params });
  },
};

export default productService;
