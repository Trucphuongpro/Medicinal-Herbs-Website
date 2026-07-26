export const defaultStatusTab = 'all';

export const orderStatusTabs = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pending', label: 'Chờ xác nhận' },
  { key: 'processing', label: 'Đang xử lý' },
  { key: 'shipping', label: 'Đang giao' },
  { key: 'delivered', label: 'Đã giao' },
  { key: 'cancelled', label: 'Đã hủy' },
];

export const ordersMockData = [
  {
    id: 'DL-2048',
    date: '2026-07-24',
    statusKey: 'pending',
    statusLabel: 'Chờ xác nhận',
    total: '485.000đ',
    details: '2 sản phẩm • Thanh toán khi nhận hàng',
  },
  {
    id: 'DL-2041',
    date: '2026-07-22',
    statusKey: 'processing',
    statusLabel: 'Đang xử lý',
    total: '730.000đ',
    details: '3 sản phẩm • Đóng gói tại kho',
  },
  {
    id: 'DL-2033',
    date: '2026-07-19',
    statusKey: 'shipping',
    statusLabel: 'Đang giao',
    total: '1.050.000đ',
    details: '4 sản phẩm • Giao nội thành',
  },
  {
    id: 'DL-2018',
    date: '2026-07-14',
    statusKey: 'delivered',
    statusLabel: 'Đã giao',
    total: '385.000đ',
    details: '2 sản phẩm • Giao thành công',
  },
  {
    id: 'DL-2005',
    date: '2026-07-08',
    statusKey: 'delivered',
    statusLabel: 'Đã giao',
    total: '620.000đ',
    details: '3 sản phẩm • Đã nhận hàng',
  },
  {
    id: 'DL-1989',
    date: '2026-07-01',
    statusKey: 'cancelled',
    statusLabel: 'Đã hủy',
    total: '215.000đ',
    details: '1 sản phẩm • Hủy theo yêu cầu',
  },
];
