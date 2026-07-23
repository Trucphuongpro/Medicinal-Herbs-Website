const createImage = ({ title, subtitle, background, foreground, accent }) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>
      </defs>
      <rect width="720" height="720" rx="54" fill="url(#bg)" />
      <circle cx="530" cy="180" r="120" fill="rgba(255,255,255,0.14)" />
      <circle cx="170" cy="560" r="150" fill="rgba(255,255,255,0.14)" />
      <path d="M380 130c84 32 172 112 172 226 0 120-84 198-214 198-118 0-198-76-198-186 0-130 106-220 240-238Z" fill="${foreground}" opacity="0.93" />
      <path d="M282 248c36-72 100-118 176-126-8 86-58 170-146 208-42 18-92 28-138 20 40-38 74-64 108-102Z" fill="#fff" opacity="0.82" />
      <rect x="62" y="540" width="320" height="108" rx="24" fill="rgba(255,255,255,0.86)" />
      <text x="94" y="590" fill="#1b4332" font-size="40" font-family="Inter, Arial, sans-serif" font-weight="700">${title}</text>
      <text x="94" y="626" fill="#2d6a4f" font-size="22" font-family="Inter, Arial, sans-serif">${subtitle}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const primaryGallery = [
  {
    id: 'gallery-1',
    alt: 'Gói sản phẩm trà atiso đỏ mật ong nhìn chính diện',
    src: createImage({
      title: 'Atiso Do',
      subtitle: 'Tra thao moc',
      background: '#d8f3dc',
      foreground: '#2d6a4f',
      accent: '#95d5b2',
    }),
  },
  {
    id: 'gallery-2',
    alt: 'Chi tiết bao bì và sắc thảo mộc của sản phẩm',
    src: createImage({
      title: 'Bao Bi',
      subtitle: 'Tinh gon dep',
      background: '#fefce8',
      foreground: '#ca8a04',
      accent: '#fde68a',
    }),
  },
  {
    id: 'gallery-3',
    alt: 'Gợi ý pha dùng sản phẩm với ly trà',
    src: createImage({
      title: 'Pha Uong',
      subtitle: 'Nhe va de dung',
      background: '#fdf2f8',
      foreground: '#be185d',
      accent: '#f9a8d4',
    }),
  },
  {
    id: 'gallery-4',
    alt: 'Set quà kèm sản phẩm dùng biếu tặng',
    src: createImage({
      title: 'Qua Tang',
      subtitle: 'Chi chu sang',
      background: '#ede9fe',
      foreground: '#6d28d9',
      accent: '#c4b5fd',
    }),
  },
];

export const productDetailMock = [
  {
    id: 'tra-atiso-do',
    name: 'Trà Atiso Đỏ Mật Ong',
    category: 'Thanh lọc',
    price: 185000,
    rating: 4.8,
    reviewCount: 128,
    stockLabel: 'Còn hàng',
    stockCount: 24,
    shortDescription:
      'Dòng trà thảo mộc dễ uống với vị chua nhẹ và hậu ngọt thanh, phù hợp cho thói quen chăm sóc sức khỏe mỗi ngày.',
    badges: ['Dễ uống', 'Đóng gói quà tặng', 'Bán chạy'],
    gallery: primaryGallery,
    description:
      'Trà Atiso Đỏ Mật Ong là lựa chọn nhẹ nhàng cho những ai muốn bắt đầu thói quen dùng thảo mộc hằng ngày. Sản phẩm được định hướng cho trải nghiệm dễ uống, hương thơm dịu và phù hợp cả khi dùng nóng lẫn dùng lạnh.',
    ingredients: [
      'Atiso đỏ sấy lạnh tuyển chọn',
      'Mật ong sấy hạt mịn',
      'Táo đỏ lát mỏng',
      'Cỏ ngọt cân bằng vị',
    ],
    usage: [
      'Cho 1 gói trà vào 250ml nước nóng khoảng 85-90°C.',
      'Ủ trong 5-7 phút để hương vị lan đều.',
      'Có thể thêm đá hoặc mật ong tùy khẩu vị.',
      'Dùng ngon hơn sau bữa ăn hoặc vào cuối ngày.',
    ],
    reviews: [
      {
        id: 1,
        name: 'Lan Chi',
        rating: 5,
        date: '2026-07-10',
        content: 'Vị rất dễ uống, màu trà đẹp và mùi thơm dịu. Mình mua thêm để biếu người thân.',
      },
      {
        id: 2,
        name: 'Tuấn Minh',
        rating: 4,
        date: '2026-07-02',
        content: 'Bao bì đẹp, pha tiện. Nếu thích vị đậm có thể ủ lâu hơn một chút.',
      },
      {
        id: 3,
        name: 'Khánh Vân',
        rating: 5,
        date: '2026-06-28',
        content: 'Phù hợp để dùng buổi chiều, cảm giác nhẹ và thư giãn hơn.',
      },
    ],
  },
];

export const relatedProducts = [
  {
    id: 'tra-hoa-cuc-ky-tu',
    name: 'Trà Hoa Cúc Kỷ Tử',
    category: 'Ngủ ngon',
    price: 168000,
    rating: 4.5,
    image: createImage({
      title: 'Hoa Cuc',
      subtitle: 'Ngu ngon',
      background: '#fefce8',
      foreground: '#ca8a04',
      accent: '#fde68a',
    }),
  },
  {
    id: 'tra-tam-sen',
    name: 'Trà Tâm Sen Hoa Nhài',
    category: 'Thư giãn',
    price: 178000,
    rating: 4,
    image: createImage({
      title: 'Tam Sen',
      subtitle: 'Thu gian',
      background: '#e0f2fe',
      foreground: '#0369a1',
      accent: '#7dd3fc',
    }),
  },
  {
    id: 'cao-sam-mat-ong',
    name: 'Cao Sâm Mật Ong Dễ Dùng',
    category: 'Bồi bổ',
    price: 360000,
    rating: 5,
    image: createImage({
      title: 'Cao Sam',
      subtitle: 'Boi bo',
      background: '#ffedd5',
      foreground: '#c2410c',
      accent: '#fdba74',
    }),
  },
  {
    id: 'set-tra-hoa-thu-thai',
    name: 'Set Trà Hoa Thư Thái',
    category: 'Quà biếu',
    price: 285000,
    rating: 4.5,
    image: createImage({
      title: 'Thu Thai',
      subtitle: 'Qua tang',
      background: '#fdf2f8',
      foreground: '#be185d',
      accent: '#f9a8d4',
    }),
  },
];
