import axiosClient from './axiosClient';

const reviewService = {
  async getByProduct(productId) {
    return axiosClient.get(`/reviews/product/${productId}`);
  },

  async getAllAdmin() {
    return axiosClient.get('/reviews/admin');
  },

  async create(data) {
    return axiosClient.post('/reviews', data);
  },

  async update(reviewId, data) {
    return axiosClient.patch(`/reviews/${reviewId}`, data);
  },

  async remove(reviewId) {
    return axiosClient.delete(`/reviews/${reviewId}`);
  },

  async updateVisibility(reviewId, data) {
    return axiosClient.patch(`/reviews/admin/${reviewId}/visibility`, data);
  },

  async removeAdmin(reviewId) {
    return axiosClient.delete(`/reviews/admin/${reviewId}`);
  },
};

export default reviewService;
