import axiosClient from './axiosClient';

const cartService = {
  getCart() {
    return axiosClient.get('/cart');
  },

  addItem(data) {
    return axiosClient.post('/cart/items', data);
  },

  updateItem(itemId, data) {
    return axiosClient.patch(`/cart/items/${itemId}`, data);
  },

  removeItem(itemId) {
    return axiosClient.delete(`/cart/items/${itemId}`);
  },

  clearCart() {
    return axiosClient.delete('/cart');
  },
};

export default cartService;
