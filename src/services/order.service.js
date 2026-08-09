import axiosClient from './axiosClient';

const orderService = {
  async getAll(params) {
    return axiosClient.get('/orders', { params });
  },

  async getById(id) {
    return axiosClient.get(`/orders/detail/${id}`);
  },

  async create(data) {
    return axiosClient.post('/orders', data);
  },

  async cancel(id) {
    return axiosClient.patch(`/orders/${id}/cancel`);
  },

  async getAdminById(id) {
    return axiosClient.get(`/orders/${id}`);
  },

  async updateStatus(id, data) {
    return axiosClient.patch(`/orders/${id}/status`, data);
  },
};

export default orderService;
