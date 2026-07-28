export const adminOverview = {
  totalProducts: 128,
  totalCategories: 14,
  totalOrders: 342,
  totalUsers: 1896,
  totalRevenue: 486500000,
};

export const dashboardStats = [
  {
    key: 'products',
    label: 'Tổng sản phẩm',
    value: '128',
    change: '+12 tháng này',
    tone: 'primary',
  },
  {
    key: 'categories',
    label: 'Tổng danh mục',
    value: '14',
    change: '+2 danh mục mới',
    tone: 'info',
  },
  {
    key: 'orders',
    label: 'Tổng đơn hàng',
    value: '342',
    change: '+18.2% so với tuần trước',
    tone: 'warning',
  },
  {
    key: 'users',
    label: 'Tổng người dùng',
    value: '1,896',
    change: '+56 khách hàng mới',
    tone: 'success',
  },
  {
    key: 'revenue',
    label: 'Tổng doanh thu',
    value: '486,5 triệu',
    change: '+9.4% so với tháng trước',
    tone: 'danger',
  },
];

export const productCategories = [
  { value: 'all', label: 'Tất cả danh mục' },
  { value: 'duoc-lieu', label: 'Dược liệu' },
  { value: 'tra-thao-moc', label: 'Trà thảo mộc' },
  { value: 'tinh-dau', label: 'Tinh dầu' },
  { value: 'cham-soc', label: 'Chăm sóc sức khỏe' },
];

export const productStatuses = [
  { value: 'all', label: 'Tất cả trạng thái' },
  { value: 'active', label: 'Đang bán' },
  { value: 'draft', label: 'Nháp' },
  { value: 'out_of_stock', label: 'Hết hàng' },
  { value: 'hidden', label: 'Ẩn' },
];

export const sortOptions = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'oldest', label: 'Cũ nhất' },
  { value: 'price_asc', label: 'Giá tăng dần' },
  { value: 'price_desc', label: 'Giá giảm dần' },
  { value: 'stock_asc', label: 'Tồn kho thấp nhất' },
];

export const products = [
  {
    id: 'PRD-001',
    name: 'Trà Atiso Đà Lạt',
    sku: 'ATISO-001',
    category: 'tra-thao-moc',
    categoryLabel: 'Trà thảo mộc',
    price: 125000,
    salePrice: 99000,
    unit: 'Hộp',
    stock: 48,
    sold: 172,
    status: 'active',
    createdAt: '2026-07-12',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'PRD-002',
    name: 'Tinh dầu sả chanh',
    sku: 'TD-SC-002',
    category: 'tinh-dau',
    categoryLabel: 'Tinh dầu',
    price: 189000,
    salePrice: 169000,
    unit: 'Chai',
    stock: 16,
    sold: 89,
    status: 'active',
    createdAt: '2026-07-05',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'PRD-003',
    name: 'Bột nghệ nguyên chất',
    sku: 'BOTNGHE-003',
    category: 'duoc-lieu',
    categoryLabel: 'Dược liệu',
    price: 86000,
    salePrice: 76000,
    unit: 'Túi',
    stock: 9,
    sold: 145,
    status: 'active',
    createdAt: '2026-06-30',
    image: 'https://images.unsplash.com/photo-1615485291234-9fbc16c5f4ac?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'PRD-004',
    name: 'Cao cà gai leo',
    sku: 'CGL-004',
    category: 'duoc-lieu',
    categoryLabel: 'Dược liệu',
    price: 215000,
    salePrice: 189000,
    unit: 'Lọ',
    stock: 0,
    sold: 57,
    status: 'out_of_stock',
    createdAt: '2026-06-28',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'PRD-005',
    name: 'Viên hà thủ ô',
    sku: 'HTO-005',
    category: 'cham-soc',
    categoryLabel: 'Chăm sóc sức khỏe',
    price: 298000,
    salePrice: 258000,
    unit: 'Hộp',
    stock: 24,
    sold: 41,
    status: 'draft',
    createdAt: '2026-06-25',
    image: 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'PRD-006',
    name: 'Trà gừng mật ong',
    sku: 'TGMO-006',
    category: 'tra-thao-moc',
    categoryLabel: 'Trà thảo mộc',
    price: 119000,
    salePrice: 99000,
    unit: 'Hộp',
    stock: 67,
    sold: 208,
    status: 'active',
    createdAt: '2026-06-22',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'PRD-007',
    name: 'Bộ quà thảo mộc an yên',
    sku: 'GIFT-007',
    category: 'cham-soc',
    categoryLabel: 'Chăm sóc sức khỏe',
    price: 459000,
    salePrice: 399000,
    unit: 'Set',
    stock: 6,
    sold: 33,
    status: 'hidden',
    createdAt: '2026-06-19',
    image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=300&q=80',
  },
];

export const recentOrders = [
  {
    id: 'ORD-2401',
    customer: 'Nguyen Thi Lan',
    date: '2026-07-28',
    total: 489000,
    status: 'pending',
    payment: 'Đã thanh toán',
  },
  {
    id: 'ORD-2400',
    customer: 'Tran Quoc Bao',
    date: '2026-07-28',
    total: 299000,
    status: 'processing',
    payment: 'COD',
  },
  {
    id: 'ORD-2399',
    customer: 'Le Thanh Ha',
    date: '2026-07-27',
    total: 712000,
    status: 'shipping',
    payment: 'Đã thanh toán',
  },
  {
    id: 'ORD-2398',
    customer: 'Pham Minh Chau',
    date: '2026-07-27',
    total: 165000,
    status: 'completed',
    payment: 'Đã thanh toán',
  },
];

export const orders = [
  ...recentOrders,
  {
    id: 'ORD-2397',
    customer: 'Vo Gia Huy',
    date: '2026-07-26',
    total: 540000,
    status: 'cancelled',
    payment: 'Hoàn tiền',
  },
  {
    id: 'ORD-2396',
    customer: 'Doan My Linh',
    date: '2026-07-26',
    total: 382000,
    status: 'completed',
    payment: 'Đã thanh toán',
  },
  {
    id: 'ORD-2395',
    customer: 'Pham Quang An',
    date: '2026-07-25',
    total: 208000,
    status: 'pending',
    payment: 'COD',
  },
];

export const topSellingProducts = [
  { id: 'TP1', name: 'Trà gừng mật ong', sold: 208, revenue: 20592000 },
  { id: 'TP2', name: 'Trà Atiso Đà Lạt', sold: 172, revenue: 17028000 },
  { id: 'TP3', name: 'Bột nghệ nguyên chất', sold: 145, revenue: 11020000 },
  { id: 'TP4', name: 'Tinh dầu sả chanh', sold: 89, revenue: 15041000 },
];

export const lowStockProducts = [
  { id: 'LS1', name: 'Cao cà gai leo', sku: 'CGL-004', stock: 0, threshold: 10 },
  { id: 'LS2', name: 'Bộ quà thảo mộc an yên', sku: 'GIFT-007', stock: 6, threshold: 8 },
  { id: 'LS3', name: 'Bột nghệ nguyên chất', sku: 'BOTNGHE-003', stock: 9, threshold: 12 },
];

export const categories = [
  {
    id: 'CAT-01',
    name: 'Dược liệu',
    slug: 'duoc-lieu',
    description: 'Nhóm sản phẩm từ thảo dược và dược liệu truyền thống.',
    productCount: 38,
    status: 'active',
  },
  {
    id: 'CAT-02',
    name: 'Trà thảo mộc',
    slug: 'tra-thao-moc',
    description: 'Các dòng trà hỗ trợ thư giãn và chăm sóc sức khỏe.',
    productCount: 26,
    status: 'active',
  },
  {
    id: 'CAT-03',
    name: 'Tinh dầu',
    slug: 'tinh-dau',
    description: 'Tinh dầu thiên nhiên cho spa, xông phòng và chăm sóc cơ thể.',
    productCount: 17,
    status: 'active',
  },
  {
    id: 'CAT-04',
    name: 'Sản phẩm theo mùa',
    slug: 'san-pham-theo-mua',
    description: 'BST sản phẩm chiến dịch và theo mùa.',
    productCount: 9,
    status: 'hidden',
  },
];

export const users = [
  {
    id: 'USR-01',
    name: 'Nguyen Thi Lan',
    email: 'lan.nguyen@example.com',
    phone: '0901234567',
    role: 'customer',
    status: 'active',
    avatar: 'https://i.pravatar.cc/100?img=32',
  },
  {
    id: 'USR-02',
    name: 'Tran Bao Ngoc',
    email: 'ngoc.tran@example.com',
    phone: '0911122233',
    role: 'admin',
    status: 'active',
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
  {
    id: 'USR-03',
    name: 'Le Minh Tri',
    email: 'tri.le@example.com',
    phone: '0989988776',
    role: 'staff',
    status: 'inactive',
    avatar: 'https://i.pravatar.cc/100?img=55',
  },
  {
    id: 'USR-04',
    name: 'Pham Hoang Yen',
    email: 'yen.pham@example.com',
    phone: '0933444555',
    role: 'customer',
    status: 'locked',
    avatar: 'https://i.pravatar.cc/100?img=47',
  },
];

export const reviews = [
  {
    id: 'REV-01',
    user: 'Nguyen Thi Lan',
    product: 'Trà Atiso Đà Lạt',
    rating: 5,
    content: 'Mùi thơm dễ chịu, đóng gói rất cẩn thận và giao hàng nhanh.',
    date: '2026-07-27',
    status: 'visible',
  },
  {
    id: 'REV-02',
    user: 'Vo Gia Huy',
    product: 'Tinh dầu sả chanh',
    rating: 4,
    content: 'Chất lượng ổn, hương thơm giữ được lâu trong phòng.',
    date: '2026-07-26',
    status: 'visible',
  },
  {
    id: 'REV-03',
    user: 'Pham Quang An',
    product: 'Cao cà gai leo',
    rating: 3,
    content: 'Sản phẩm tốt nhưng mong shop bổ sung hướng dẫn sử dụng chi tiết hơn.',
    date: '2026-07-24',
    status: 'hidden',
  },
];

export const coupons = [
  {
    id: 'CPN-01',
    code: 'SUMMER10',
    type: 'Phần trăm',
    value: '10%',
    quantity: 200,
    expiredAt: '2026-08-31',
    status: 'active',
  },
  {
    id: 'CPN-02',
    code: 'FREESHIP25',
    type: 'Tiền mặt',
    value: '25.000đ',
    quantity: 120,
    expiredAt: '2026-08-10',
    status: 'active',
  },
  {
    id: 'CPN-03',
    code: 'VIP50K',
    type: 'Tiền mặt',
    value: '50.000đ',
    quantity: 20,
    expiredAt: '2026-07-20',
    status: 'expired',
  },
];

export const inventory = products.map((product) => ({
  id: product.id,
  name: product.name,
  sku: product.sku,
  stock: product.stock,
  lowStockAlert: product.stock <= 10 ? 'Cần nhập thêm' : 'Ổn định',
  sold: product.sold,
}));

export const reportCards = [
  { key: 'revenue', label: 'Doanh thu tháng', value: '126,4 triệu', hint: 'So với tháng trước +8.2%' },
  { key: 'orders', label: 'Đơn hàng tháng', value: '214', hint: 'Tỷ lệ hoàn thành 92%' },
  { key: 'topProduct', label: 'SP bán chạy', value: 'Trà gừng mật ong', hint: '208 sản phẩm đã bán' },
  { key: 'topCategory', label: 'Danh mục mạnh nhất', value: 'Trà thảo mộc', hint: 'Chiếm 34% doanh thu' },
];

export const orderDetail = {
  id: 'ORD-2401',
  customer: {
    name: 'Nguyen Thi Lan',
    phone: '0901234567',
    email: 'lan.nguyen@example.com',
  },
  address: '24 Nguyen Van Cu, Phuong 2, Quan 5, TP. Ho Chi Minh',
  payment: 'Thanh toán qua VNPay',
  status: 'processing',
  note: 'Khách nhờ gọi trước khi giao hàng.',
  timeline: [
    { title: 'Đơn hàng được tạo', date: '2026-07-28 08:15', status: 'completed' },
    { title: 'Đã xác nhận thanh toán', date: '2026-07-28 08:18', status: 'completed' },
    { title: 'Đang chuẩn bị hàng', date: '2026-07-28 09:05', status: 'current' },
    { title: 'Bàn giao đơn vị vận chuyển', date: 'Dự kiến 2026-07-28 14:00', status: 'upcoming' },
  ],
  items: [
    {
      id: 'IT-01',
      name: 'Trà Atiso Đà Lạt',
      quantity: 2,
      price: 99000,
      total: 198000,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'IT-02',
      name: 'Tinh dầu sả chanh',
      quantity: 1,
      price: 169000,
      total: 169000,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'IT-03',
      name: 'Trà gừng mật ong',
      quantity: 1,
      price: 99000,
      total: 99000,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&q=80',
    },
  ],
  summary: {
    subtotal: 466000,
    shipping: 23000,
    discount: 0,
    total: 489000,
  },
};

export const productFormInitialValues = {
  name: '',
  category: 'duoc-lieu',
  price: '0',
  salePrice: '0',
  unit: 'Hộp',
  stock: '0',
  ingredients: '',
  benefits: '',
  usage: '',
  description: '',
  status: 'active',
};

export const editProductInitialValues = {
  name: 'Trà Atiso Đà Lạt',
  category: 'tra-thao-moc',
  price: '125000',
  salePrice: '99000',
  unit: 'Hộp',
  stock: '48',
  ingredients: 'Hoa atiso đỏ, cỏ ngọt, cam thảo.',
  benefits: 'Hỗ trợ thanh nhiệt, thư giãn và tốt cho gan.',
  usage: 'Pha 1 gói với 200ml nước nóng trong 3-5 phút.',
  description: 'Sản phẩm trà thảo mộc phù hợp dùng hàng ngày.',
  status: 'active',
};

export const couponFormInitialValues = {
  code: 'NEWUSER20',
  type: 'percent',
  value: '20',
  quantity: '50',
  expiredAt: '2026-09-15',
  status: 'active',
};

export const settingsInitialValues = {
  storeName: 'Website Dược Liệu',
  logo: 'logo-duoc-lieu.png',
  banner: 'banner-summer-herbs.jpg',
  hotline: '1900 6868',
  email: 'support@duoclieu.vn',
  address: '180 Cao Thang, Phuong 12, Quan 10, TP. Ho Chi Minh',
  facebook: 'https://facebook.com/websiteduoclieu',
  zalo: 'https://zalo.me/websiteduoclieu',
  policy: 'Cam kết sản phẩm có nguồn gốc rõ ràng, giao hàng toàn quốc, hỗ trợ đổi trả trong 7 ngày.',
};

export const orderStatusTabs = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ xác nhận' },
  { value: 'processing', label: 'Đang xử lý' },
  { value: 'shipping', label: 'Đang giao' },
  { value: 'completed', label: 'Hoàn thành' },
  { value: 'cancelled', label: 'Đã hủy' },
];
