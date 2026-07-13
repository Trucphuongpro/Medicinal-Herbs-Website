import axiosClient from './axiosClient';

const orderService = {
  getAll(params) {
    return axiosClient.get('/orders', { params });
  },

  getById(id) {
    return axiosClient.get(`/orders/${id}`);
  },

  create(data) {
    return axiosClient.post('/orders', data);
  },

  cancel(id) {
    return axiosClient.patch(`/orders/${id}/cancel`);
  },
};

export default orderService;
