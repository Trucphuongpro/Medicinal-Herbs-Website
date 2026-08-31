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

export const defaultFilter = 'all';

export const filterOptions = [
  { value: 'all', label: 'Tất cả' },
  { value: 'thanh-loc', label: 'Thanh lọc' },
  { value: 'boi-bo', label: 'Bồi bổ' },
  { value: 'qua-bieu', label: 'Quà biếu' },
];

export const mockSearchProducts = [
  {
    id: 'tra-atiso-do',
    name: 'Trà Atiso Đỏ Mật Ong',
    category: 'Thanh lọc',
    filterKey: 'thanh-loc',
    price: 185000,
    rating: 5,
    tags: ['atiso', 'mật ong', 'thanh lọc'],
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
    filterKey: 'boi-bo',
    price: 360000,
    rating: 5,
    tags: ['sâm', 'bồi bổ', 'mật ong'],
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
    filterKey: 'qua-bieu',
    price: 285000,
    rating: 4.5,
    tags: ['quà tặng', 'trà hoa', 'set quà'],
    image: createProductImage({
      title: 'Thu Thai',
      subtitle: 'Qua tang',
      background: '#fdf2f8',
      foreground: '#be185d',
      accent: '#f9a8d4',
    }),
  },
  {
    id: 'tra-hoa-cuc-ky-tu',
    name: 'Trà Hoa Cúc Kỷ Tử',
    category: 'Thanh lọc',
    filterKey: 'thanh-loc',
    price: 168000,
    rating: 4.5,
    tags: ['hoa cúc', 'kỷ tử', 'trà'],
    image: createProductImage({
      title: 'Hoa Cuc',
      subtitle: 'Ngu ngon',
      background: '#fefce8',
      foreground: '#ca8a04',
      accent: '#fde68a',
    }),
  },
  {
    id: 'dong-trung-ha-thao',
    name: 'Đông Trùng Hạ Thảo Nguyên Sợi',
    category: 'Bồi bổ',
    filterKey: 'boi-bo',
    price: 690000,
    rating: 5,
    tags: ['đông trùng', 'cao cấp', 'bồi bổ'],
    image: createProductImage({
      title: 'Dong Trung',
      subtitle: 'Ban chay',
      background: '#ecfccb',
      foreground: '#3f6212',
      accent: '#bef264',
    }),
  },
  {
    id: 'qua-bieu-phuc-loc',
    name: 'Hộp Quà Phúc Lộc Thảo Mộc',
    category: 'Quà biếu',
    filterKey: 'qua-bieu',
    price: 580000,
    rating: 5,
    tags: ['hộp quà', 'thảo mộc', 'phúc lộc'],
    image: createProductImage({
      title: 'Phuc Loc',
      subtitle: 'Sang trong',
      background: '#ede9fe',
      foreground: '#6d28d9',
      accent: '#c4b5fd',
    }),
  },
  {
    id: 'tra-gao-lut',
    name: 'Trà Gạo Lứt 8 Loại Hạt',
    category: 'Thanh lọc',
    filterKey: 'thanh-loc',
    price: 132000,
    rating: 4.5,
    tags: ['gạo lứt', 'trà', 'dễ uống'],
    image: createProductImage({
      title: 'Gao Lut',
      subtitle: 'Thanh nhe',
      background: '#f5f5f4',
      foreground: '#57534e',
      accent: '#d6d3d1',
    }),
  },
];
