import axiosClient from './axiosClient';

const reviewService = {
  getByProduct(productId, params) {
    return axiosClient.get(`/products/${productId}/reviews`, { params });
  },

  create(productId, data) {
    return axiosClient.post(`/products/${productId}/reviews`, data);
  },

  update(reviewId, data) {
    return axiosClient.patch(`/reviews/${reviewId}`, data);
  },

  remove(reviewId) {
    return axiosClient.delete(`/reviews/${reviewId}`);
  },
};

export default reviewService;
