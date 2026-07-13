import axiosClient from './axiosClient';

const categoryService = {
  getAll() {
    return axiosClient.get('/categories');
  },

  getById(id) {
    return axiosClient.get(`/categories/${id}`);
  },

  getTree() {
    return axiosClient.get('/categories/tree');
  },
};

export default categoryService;
