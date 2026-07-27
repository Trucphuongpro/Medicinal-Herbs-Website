import axiosClient from './axiosClient';

const cartService = {
  async getCart() {
    return axiosClient.get('/cart');
  },

  async addItem(data) {
    return axiosClient.post('/cart/add', data);
  },

  async updateItem(itemId, data) {
    return axiosClient.patch(`/cart/item/${itemId}`, data);
  },

  async removeItem(itemId) {
    return axiosClient.delete(`/cart/item/${itemId}`);
  },

  async clearCart() {
    return axiosClient.delete('/cart/clear');
  },
};

export default cartService;
