const paymentMethods = [
  {
    id: 'cod',
    label: 'Thanh toán khi nhận hàng',
    description: 'Phù hợp khi bạn muốn kiểm tra đơn trước khi thanh toán.',
  },
  {
    id: 'bank_transfer',
    label: 'Chuyển khoản ngân hàng',
    description: 'Chuyển khoản trước và xác nhận đơn sau khi hệ thống ghi nhận.',
  },
  {
    id: 'vnpay',
    label: 'VNPay',
    description: 'Thanh toán trực tuyến qua cổng VNPay khi backend hỗ trợ luồng đầy đủ.',
  },
  {
    id: 'momo',
    label: 'MoMo',
    description: 'Thanh toán bằng ví điện tử MoMo khi backend hỗ trợ luồng đầy đủ.',
  },
];

const paymentService = {
  async getMethods() {
    return paymentMethods;
  },
};

export default paymentService;
