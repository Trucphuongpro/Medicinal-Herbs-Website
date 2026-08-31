const createProductImage = ({ title, subtitle, background, foreground, accent }) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>
      </defs>
      <rect width="480" height="480" rx="40" fill="url(#bg)" />
      <circle cx="360" cy="124" r="78" fill="rgba(255,255,255,0.18)" />
      <circle cx="110" cy="352" r="96" fill="rgba(255,255,255,0.14)" />
      <path d="M242 104c54 18 114 68 114 146 0 72-52 120-130 120-70 0-118-46-118-112 0-84 70-142 134-154Z" fill="${foreground}" opacity="0.92" />
      <path d="M188 178c24-44 62-68 114-70-6 56-44 104-98 122-28 10-58 14-86 10 24-24 46-42 70-62Z" fill="#fff" opacity="0.82" />
      <rect x="42" y="336" width="220" height="82" rx="20" fill="rgba(255,255,255,0.86)" />
      <text x="64" y="372" fill="#1e3d22" font-size="30" font-family="Inter, Arial, sans-serif" font-weight="700">${title}</text>
      <text x="64" y="400" fill="#2c5530" font-size="16" font-family="Inter, Arial, sans-serif">${subtitle}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const breadcrumbItems = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Cửa hàng' },
];

export const categoryOptions = [
  { value: 'all', label: 'Tất cả danh mục' },
  { value: 'thanh-loc', label: 'Thanh lọc' },
  { value: 'boi-bo', label: 'Bồi bổ' },
  { value: 'ngu-ngon', label: 'Ngủ ngon' },
  { value: 'qua-bieu', label: 'Quà biếu' },
];

export const priceOptions = [
  { value: 'all', label: 'Tất cả mức giá' },
  { value: 'under-200', label: 'Dưới 200.000đ' },
  { value: '200-400', label: '200.000đ - 400.000đ' },
  { value: 'over-400', label: 'Trên 400.000đ' },
];

export const ratingOptions = [
  { value: 'all', label: 'Tất cả đánh giá' },
  { value: '4', label: 'Từ 4 sao' },
  { value: '5', label: '5 sao' },
];

export const statusOptions = [
  { value: 'all', label: 'Tất cả tình trạng' },
  { value: 'in-stock', label: 'Còn hàng' },
  { value: 'limited', label: 'Sắp hết' },
  { value: 'new', label: 'Mới về' },
];

export const sortOptions = [
  { value: 'featured', label: 'Nổi bật nhất' },
  { value: 'price-asc', label: 'Giá thấp đến cao' },
  { value: 'price-desc', label: 'Giá cao đến thấp' },
  { value: 'rating-desc', label: 'Đánh giá cao nhất' },
  { value: 'name-asc', label: 'Tên A-Z' },
];

export const products = [
  {
    id: 'tra-atiso-do',
    name: 'Trà Atiso Đỏ Mật Ong',
    category: 'Thanh lọc',
    categorySlug: 'thanh-loc',
    price: 185000,
    priceRange: 'under-200',
    rating: 5,
    status: 'in-stock',
    featuredRank: 1,
    image: createProductImage({
      title: 'Atiso Do',
      subtitle: 'Tra thao moc',
      background: '#e2ead2',
      foreground: '#2c5530',
      accent: '#a8c48a',
    }),
  },
  {
    id: 'sam-day-ngoc-linh',
    name: 'Sâm Dây Ngọc Linh Sấy Lạnh',
    category: 'Bồi bổ',
    categorySlug: 'boi-bo',
    price: 420000,
    priceRange: 'over-400',
    rating: 5,
    status: 'limited',
    featuredRank: 6,
    image: createProductImage({
      title: 'Sam Day',
      subtitle: 'Duoc lieu cao cap',
      background: '#fef3c7',
      foreground: '#b45309',
      accent: '#fcd34d',
    }),
  },
  {
    id: 'tra-hoa-cuc-ky-tu',
    name: 'Trà Hoa Cúc Kỷ Tử',
    category: 'Ngủ ngon',
    categorySlug: 'ngu-ngon',
    price: 168000,
    priceRange: 'under-200',
    rating: 4.5,
    status: 'in-stock',
    featuredRank: 3,
    image: createProductImage({
      title: 'Hoa Cuc',
      subtitle: 'Ngu ngon',
      background: '#fefce8',
      foreground: '#ca8a04',
      accent: '#fde68a',
    }),
  },
  {
    id: 'set-qua-an-nhien',
    name: 'Set Quà An Nhiên 4 Món',
    category: 'Quà biếu',
    categorySlug: 'qua-bieu',
    price: 520000,
    priceRange: 'over-400',
    rating: 5,
    status: 'new',
    featuredRank: 8,
    image: createProductImage({
      title: 'An Nhien',
      subtitle: 'Qua bieu',
      background: '#fae8ff',
      foreground: '#86198f',
      accent: '#e879f9',
    }),
  },
  {
    id: 'tra-gao-lut-8-loai-hat',
    name: 'Trà Gạo Lứt 8 Loại Hạt',
    category: 'Thanh lọc',
    categorySlug: 'thanh-loc',
    price: 132000,
    priceRange: 'under-200',
    rating: 4.5,
    status: 'in-stock',
    featuredRank: 4,
    image: createProductImage({
      title: 'Gao Lut',
      subtitle: 'Thanh nhe',
      background: '#f5f5f4',
      foreground: '#57534e',
      accent: '#d6d3d1',
    }),
  },
  {
    id: 'bot-diep-luc',
    name: 'Bột Diệp Lục Cỏ Lúa Mì',
    category: 'Thanh lọc',
    categorySlug: 'thanh-loc',
    price: 248000,
    priceRange: '200-400',
    rating: 4.5,
    status: 'new',
    featuredRank: 5,
    image: createProductImage({
      title: 'Diep Luc',
      subtitle: 'Song xanh',
      background: '#dcfce7',
      foreground: '#166534',
      accent: '#86efac',
    }),
  },
  {
    id: 'dong-trung-ha-thao-soi',
    name: 'Đông Trùng Hạ Thảo Nguyên Sợi',
    category: 'Bồi bổ',
    categorySlug: 'boi-bo',
    price: 690000,
    priceRange: 'over-400',
    rating: 5,
    status: 'limited',
    featuredRank: 9,
    image: createProductImage({
      title: 'Dong Trung',
      subtitle: 'Ban chay',
      background: '#ecfccb',
      foreground: '#3f6212',
      accent: '#bef264',
    }),
  },
  {
    id: 'tra-tam-sen',
    name: 'Trà Tâm Sen Hoa Nhài',
    category: 'Ngủ ngon',
    categorySlug: 'ngu-ngon',
    price: 178000,
    priceRange: 'under-200',
    rating: 4,
    status: 'in-stock',
    featuredRank: 7,
    image: createProductImage({
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
    categorySlug: 'boi-bo',
    price: 360000,
    priceRange: '200-400',
    rating: 5,
    status: 'new',
    featuredRank: 2,
    image: createProductImage({
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
    categorySlug: 'qua-bieu',
    price: 285000,
    priceRange: '200-400',
    rating: 4.5,
    status: 'in-stock',
    featuredRank: 10,
    image: createProductImage({
      title: 'Thu Thai',
      subtitle: 'Lam qua tang',
      background: '#fdf2f8',
      foreground: '#be185d',
      accent: '#f9a8d4',
    }),
  },
  {
    id: 'qua-bieu-phuc-loc',
    name: 'Hộp Quà Phúc Lộc Thảo Mộc',
    category: 'Quà biếu',
    categorySlug: 'qua-bieu',
    price: 580000,
    priceRange: 'over-400',
    rating: 5,
    status: 'limited',
    featuredRank: 11,
    image: createProductImage({
      title: 'Phuc Loc',
      subtitle: 'Sang trong',
      background: '#ede9fe',
      foreground: '#6d28d9',
      accent: '#c4b5fd',
    }),
  },
  {
    id: 'tra-hong-tao-ky-tu',
    name: 'Trà Hồng Táo Kỷ Tử',
    category: 'Bồi bổ',
    categorySlug: 'boi-bo',
    price: 215000,
    priceRange: '200-400',
    rating: 4,
    status: 'in-stock',
    featuredRank: 12,
    image: createProductImage({
      title: 'Hong Tao',
      subtitle: 'De uong',
      background: '#fee2e2',
      foreground: '#b91c1c',
      accent: '#fca5a5',
    }),
  },
];
