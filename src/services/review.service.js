import axiosClient from './axiosClient';

const reviewService = {
  async getByProduct(productId) {
    return axiosClient.get(`/reviews/product/${productId}`);
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
};

export default reviewService;
