export const defaultTab = 'profile';

export const profileTabs = [
  { key: 'profile', label: 'Hồ sơ' },
  { key: 'address', label: 'Địa chỉ' },
  { key: 'orders', label: 'Đơn hàng' },
  { key: 'password', label: 'Đổi mật khẩu' },
  { key: 'logout', label: 'Đăng xuất' },
];

export const userProfileData = {
  profile: {
    fullName: 'Trúc Phương',
    email: 'trucphuong@example.com',
    phone: '0901234567',
    birthday: '1998-08-16',
    memberSince: '2024',
    totalOrders: 18,
    defaultAddressLabel: 'Nhà riêng',
  },
  addresses: [
    {
      id: 1,
      label: 'Nhà riêng',
      receiver: 'Trúc Phương',
      phone: '0901234567',
      address: '28 Nguyễn Thị Minh Khai, Phường Võ Thị Sáu, Quận 3, Hồ Chí Minh',
      isDefault: true,
    },
    {
      id: 2,
      label: 'Văn phòng',
      receiver: 'Trúc Phương',
      phone: '0908888888',
      address: '12 Võ Văn Tần, Phường 6, Quận 3, Hồ Chí Minh',
      isDefault: false,
    },
  ],
  orders: [
    {
      id: 'DL-1024',
      date: '2026-07-12',
      status: 'Đang giao',
      total: '730.000đ',
      items: '3 sản phẩm',
    },
    {
      id: 'DL-1007',
      date: '2026-06-30',
      status: 'Hoàn tất',
      total: '385.000đ',
      items: '2 sản phẩm',
    },
    {
      id: 'DL-0981',
      date: '2026-06-14',
      status: 'Hoàn tất',
      total: '1.050.000đ',
      items: '4 sản phẩm',
    },
  ],
};
