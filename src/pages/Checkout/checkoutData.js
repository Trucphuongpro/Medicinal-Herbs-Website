const createProductImage = ({ title, subtitle, background, foreground, accent }) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>
      </defs>
      <rect width="480" height="480" rx="36" fill="url(#bg)" />
      <circle cx="356" cy="124" r="74" fill="rgba(255,255,255,0.18)" />
      <circle cx="124" cy="352" r="90" fill="rgba(255,255,255,0.14)" />
      <path d="M246 106c60 18 114 70 114 146 0 72-52 122-130 122-72 0-122-46-122-116 0-84 76-140 138-152Z" fill="${foreground}" opacity="0.92" />
      <path d="M190 182c24-42 68-70 114-76-8 58-46 108-102 126-26 8-56 12-84 8 26-26 44-42 72-58Z" fill="#fff" opacity="0.84" />
      <rect x="42" y="338" width="210" height="78" rx="18" fill="rgba(255,255,255,0.86)" />
      <text x="62" y="372" fill="#1e3d22" font-size="28" font-family="Inter, Arial, sans-serif" font-weight="700">${title}</text>
      <text x="62" y="398" fill="#2c5530" font-size="16" font-family="Inter, Arial, sans-serif">${subtitle}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const initialFormState = {
  province: 'Hồ Chí Minh',
  district: 'Quận 3',
  ward: 'Phường Võ Thị Sáu',
  address: '28 Nguyễn Thị Minh Khai',
  receiverName: 'Trúc Phương',
  receiverPhone: '0901234567',
  note: 'Giao giờ hành chính, vui lòng gọi trước khi đến.',
};

export const paymentMethods = [
  {
    id: 'cod',
    label: 'Thanh toán khi nhận hàng',
    description: 'Phù hợp khi bạn muốn kiểm tra đơn trước khi thanh toán.',
  },
  {
    id: 'banking',
    label: 'Chuyển khoản ngân hàng',
    description: 'Hiển thị như một lựa chọn mock để hoàn thiện giao diện checkout.',
  },
  {
    id: 'wallet',
    label: 'Ví điện tử',
    description: 'Mô phỏng luồng thanh toán nhanh trên thiết bị di động.',
  },
];

export const products = [
  {
    id: 'tra-atiso-do',
    name: 'Trà Atiso Đỏ Mật Ong',
    category: 'Thanh lọc',
    price: 185000,
    quantity: 2,
    image: createProductImage({
      title: 'Atiso Do',
      subtitle: 'Tra thao moc',
      background: '#e2ead2',
      foreground: '#2c5530',
      accent: '#a8c48a',
    }),
  },
  {
    id: 'cao-sam-mat-ong',
    name: 'Cao Sâm Mật Ong Dễ Dùng',
    category: 'Bồi bổ',
    price: 360000,
    quantity: 1,
    image: createProductImage({
      title: 'Cao Sam',
      subtitle: 'Boi bo',
      background: '#ffedd5',
      foreground: '#c2410c',
      accent: '#fdba74',
    }),
  },
];

export const voucherOptions = [
  {
    code: 'HERB10',
    type: 'percentage',
    value: 10,
    description: 'Giảm 10% tổng giá trị sản phẩm',
  },
  {
    code: 'FREESHIP',
    type: 'fixed',
    value: 30000,
    description: 'Miễn phí vận chuyển nội thành',
  },
];
