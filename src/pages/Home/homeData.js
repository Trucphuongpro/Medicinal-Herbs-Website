const createSvgDataUri = ({ title, subtitle, background, foreground, accent }) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>
      </defs>
      <rect width="480" height="480" rx="36" fill="url(#bg)" />
      <circle cx="368" cy="124" r="68" fill="rgba(255,255,255,0.2)" />
      <circle cx="122" cy="360" r="88" fill="rgba(255,255,255,0.12)" />
      <path d="M250 112c56 16 108 62 108 136 0 70-50 122-126 122-68 0-120-44-120-112 0-84 72-140 138-146Z" fill="${foreground}" opacity="0.92" />
      <path d="M198 182c18-40 58-72 102-76-4 50-36 104-84 124-30 12-62 16-90 14 18-28 42-46 72-62Z" fill="#fff" opacity="0.85" />
      <path d="M246 204c6 44-8 88-42 126 52-10 98-40 132-88-18 4-40 2-62-8-12-6-20-16-28-30Z" fill="#fff" opacity="0.56" />
      <rect x="42" y="338" width="196" height="78" rx="18" fill="rgba(255,255,255,0.86)" />
      <text x="62" y="372" fill="#1b4332" font-size="28" font-family="Inter, Arial, sans-serif" font-weight="700">${title}</text>
      <text x="62" y="398" fill="#2d6a4f" font-size="16" font-family="Inter, Arial, sans-serif">${subtitle}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const categories = [
  {
    id: 'boi-bo',
    name: 'Bồi bổ cơ thể',
    description: 'Đông trùng, sâm và các thảo dược giúp phục hồi thể lực mỗi ngày.',
    icon: '🌿',
    highlight: '18 sản phẩm tuyển chọn',
  },
  {
    id: 'thanh-loc',
    name: 'Thanh lọc tự nhiên',
    description: 'Các dòng trà và dược liệu hỗ trợ cân bằng, nhẹ nhàng cho cơ thể.',
    icon: '🍃',
    highlight: 'Công thức dễ dùng',
  },
  {
    id: 'ngu-ngon',
    name: 'An thần ngủ ngon',
    description: 'Ưu tiên những vị thảo mộc dịu, phù hợp thói quen sống bận rộn.',
    icon: '🌙',
    highlight: 'Được khách hàng yêu thích',
  },
  {
    id: 'qua-bieu',
    name: 'Quà biếu sức khỏe',
    description: 'Set quà đóng gói chỉnh chu cho gia đình, đối tác và người thân.',
    icon: '🎁',
    highlight: 'Bao bì sang trọng',
  },
];

export const featuredProducts = [
  {
    id: 'tra-atiso-do',
    name: 'Trà Atiso Đỏ Mật Ong',
    category: 'Thanh lọc',
    price: 185000,
    rating: 5,
    image: createSvgDataUri({
      title: 'Atiso Do',
      subtitle: 'Tra thao moc',
      background: '#d8f3dc',
      foreground: '#2d6a4f',
      accent: '#95d5b2',
    }),
  },
  {
    id: 'sam-day-ngo',
    name: 'Sâm Dây Ngọc Linh Sấy Lạnh',
    category: 'Bồi bổ',
    price: 420000,
    rating: 5,
    image: createSvgDataUri({
      title: 'Sam Day',
      subtitle: 'Duoc lieu cao cap',
      background: '#fef3c7',
      foreground: '#b45309',
      accent: '#fcd34d',
    }),
  },
  {
    id: 'tra-ngu-hoa-cuc',
    name: 'Trà Hoa Cúc Kỷ Tử',
    category: 'Ngủ ngon',
    price: 168000,
    rating: 4.5,
    image: createSvgDataUri({
      title: 'Hoa Cuc',
      subtitle: 'Thanh am de uong',
      background: '#fefce8',
      foreground: '#ca8a04',
      accent: '#fde68a',
    }),
  },
  {
    id: 'bo-quyt-vo-cam',
    name: 'Bột Quýt Vỏ Cam Thảo Mộc',
    category: 'Tiêu hoá',
    price: 149000,
    rating: 4.5,
    image: createSvgDataUri({
      title: 'Vo Cam',
      subtitle: 'Am bung moi ngay',
      background: '#ffedd5',
      foreground: '#c2410c',
      accent: '#fdba74',
    }),
  },
];

export const bestSellerProducts = [
  {
    id: 'dong-trung-ha-thao',
    name: 'Đông Trùng Hạ Thảo Nguyên Sợi',
    category: 'Best seller',
    price: 690000,
    rating: 5,
    image: createSvgDataUri({
      title: 'Dong Trung',
      subtitle: 'Ban chay nhat',
      background: '#ecfccb',
      foreground: '#3f6212',
      accent: '#bef264',
    }),
  },
  {
    id: 'tra-gao-lut',
    name: 'Trà Gạo Lứt 8 Loại Hạt',
    category: 'Dùng hằng ngày',
    price: 132000,
    rating: 4.5,
    image: createSvgDataUri({
      title: 'Gao Lut',
      subtitle: 'Vi thanh nhe',
      background: '#f5f5f4',
      foreground: '#57534e',
      accent: '#d6d3d1',
    }),
  },
  {
    id: 'bot-diep-luc',
    name: 'Bột Diệp Lục Cỏ Lúa Mì',
    category: 'Thanh lọc',
    price: 248000,
    rating: 4.5,
    image: createSvgDataUri({
      title: 'Diep Luc',
      subtitle: 'Song xanh moi ngay',
      background: '#dcfce7',
      foreground: '#166534',
      accent: '#86efac',
    }),
  },
  {
    id: 'set-qua-thao-moc',
    name: 'Set Quà Thảo Mộc Tinh Chọn',
    category: 'Quà biếu',
    price: 520000,
    rating: 5,
    image: createSvgDataUri({
      title: 'Qua Tang',
      subtitle: 'Trang nha, de tang',
      background: '#fae8ff',
      foreground: '#86198f',
      accent: '#e879f9',
    }),
  },
];

export const heroHighlights = [
  'Nguồn dược liệu tuyển chọn theo mùa',
  'Đóng gói sạch, thông tin minh bạch',
  'Tư vấn nhu cầu dùng hằng ngày',
];

export const heroStats = [
  { value: '1200+', label: 'Khách hàng quay lại' },
  { value: '48h', label: 'Giao nhanh tại nội thành' },
  { value: '98%', label: 'Đánh giá hài lòng' },
];

export const bestSellerBenefits = [
  'Top sản phẩm được chọn nhiều trong 30 ngày gần đây',
  'Hương vị dễ dùng, phù hợp cả người mới bắt đầu',
  'Đóng gói chỉn chu, thích hợp mua dùng hoặc làm quà',
];

export const aboutPoints = [
  {
    title: 'Chọn lọc từ vùng trồng uy tín',
    description: 'Mỗi lô hàng được ưu tiên theo mùa vụ, nguồn gốc và độ đồng đều của dược liệu.',
  },
  {
    title: 'Ưu tiên trải nghiệm dùng thật',
    description: 'Danh mục được sắp theo nhu cầu thường gặp để khách dễ chọn đúng ngay từ lần đầu.',
  },
  {
    title: 'Đóng gói gọn gàng, dễ bảo quản',
    description: 'Thiết kế bao bì và khẩu phần phù hợp cho cả sử dụng cá nhân lẫn quà biếu.',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Minh Anh',
    role: 'Khách hàng văn phòng',
    quote:
      'Mình thích cách trang này trình bày rất rõ công dụng và cách dùng. Chọn quà cho ba mẹ cũng cảm thấy yên tâm hơn.',
  },
  {
    id: 2,
    name: 'Quang Huy',
    role: 'Người dùng lâu năm',
    quote:
      'Các set trà thảo mộc đóng gói đẹp, uống nhẹ và dễ duy trì mỗi ngày. Giao hàng cũng nhanh hơn mình nghĩ.',
  },
  {
    id: 3,
    name: 'Thảo Nhi',
    role: 'Khách mua quà biếu',
    quote:
      'Điểm mình thích nhất là giao diện gọn và nhìn cao cấp, không bị rối. Mình tìm được set quà rất nhanh.',
  },
];

export const blogPosts = [
  {
    id: 1,
    title: 'Cách chọn trà thảo mộc phù hợp cho nhịp sống bận rộn',
    excerpt: 'Gợi ý 3 nhóm trà dễ bắt đầu nếu bạn muốn duy trì thói quen chăm sóc sức khỏe mỗi ngày.',
    tag: 'Mẹo sử dụng',
    readTime: '5 phút đọc',
  },
  {
    id: 2,
    title: 'Dược liệu làm quà: nên ưu tiên tiêu chí nào để vừa đẹp vừa thiết thực',
    excerpt: 'Từ mức giá, bao bì đến công dụng, đây là những điểm quan trọng khi chọn quà biếu sức khỏe.',
    tag: 'Quà tặng',
    readTime: '4 phút đọc',
  },
  {
    id: 3,
    title: 'Gợi ý xây dựng góc trà tại nhà với cảm giác thư thả hơn mỗi tối',
    excerpt: 'Một vài cách sắp xếp đơn giản giúp việc pha trà và nghỉ ngơi trở thành thói quen dễ duy trì.',
    tag: 'Phong cách sống',
    readTime: '6 phút đọc',
  },
];

export const newsletterBenefits = [
  'Cập nhật sản phẩm mới theo mùa',
  'Nhận ưu đãi riêng cho khách đăng ký',
  'Gợi ý cách dùng và bảo quản đơn giản',
];
