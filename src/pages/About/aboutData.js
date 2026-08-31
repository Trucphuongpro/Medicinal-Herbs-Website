export const buildIntroStats = ({ productCount = 0, categoryCount = 0 }) => [
  { value: `${productCount}+`, label: 'Sản phẩm\nchọn lọc' },
  { value: String(categoryCount).padStart(2, '0'), label: 'Nhóm\ndược liệu' },
  { value: '2024', label: 'Bắt đầu\nhành trình' },
];

export const processSteps = [
  {
    id: 1,
    title: 'Chọn nguồn nguyên liệu',
    image: '/images/products/tinh-dau-sa-chanh.jpg',
    alt: 'Bụi sả chanh đang phát triển trong vườn',
    description: 'Ưu tiên vùng trồng ổn định, mùa vụ rõ ràng và chất lượng đồng đều giữa các lô.',
  },
  {
    id: 2,
    title: 'Sàng lọc và đóng gói',
    image: '/images/products/cam-thao.jpg',
    alt: 'Cam thảo bắc đã thái lát',
    description: 'Sản phẩm được định hướng để dễ bảo quản, dễ dùng và có hình thức chỉn chu khi biếu tặng.',
  },
  {
    id: 3,
    title: 'Sắp xếp theo nhu cầu',
    image: '/images/products/tao-do.jpg',
    alt: 'Táo đỏ khô xếp đầy',
    description: 'Danh mục được trình bày theo mục đích sử dụng để người mới vẫn chọn nhanh và không bị rối.',
  },
  {
    id: 4,
    title: 'Đồng hành sau mua',
    image: '/images/products/tra-hoa-cuc.jpg',
    alt: 'Hoa cúc đang hãm trong ấm sứ',
    description: 'Mọi thông tin hiển thị đều hướng đến trải nghiệm minh bạch và dễ hiểu trong từng lần quay lại.',
  },
];

export const values = [
  {
    index: '01',
    title: 'Minh bạch',
    tone: 'green',
    description: 'Mỗi sản phẩm được diễn giải ngắn gọn, rõ vai trò và dễ tiếp cận với người dùng lần đầu.',
  },
  {
    index: '02',
    title: 'Chọn lọc',
    tone: 'amber',
    description: 'Không ôm quá nhiều danh mục, chỉ ưu tiên những dòng thảo mộc có trải nghiệm dùng rõ ràng.',
  },
  {
    index: '03',
    title: 'Chỉn chu',
    tone: 'clay',
    description: 'Từ hình ảnh đến bao bì và luồng mua hàng đều được giữ cảm giác gọn, sạch và đáng tin cậy.',
  },
];

export const certifications = [
  {
    title: 'Nguồn gốc rõ ràng',
    detail: 'Mỗi nhóm sản phẩm đều được mô tả theo vùng nguyên liệu và mục đích sử dụng phù hợp.',
  },
  {
    title: 'Đóng gói tiêu chuẩn',
    detail: 'Bao bì hướng đến sự gọn gàng, dễ bảo quản và giữ tính thẩm mỹ khi làm quà.',
  },
  {
    title: 'Quy trình chọn lọc nội bộ',
    detail: 'Danh mục được rà soát định kỳ để giữ trải nghiệm nhất quán trên toàn bộ cửa hàng.',
  },
];

export const galleryStrip = [
  { image: '/images/products/nhan-sam-han-quoc.jpg', alt: 'Củ nhân sâm Hàn Quốc phơi khô' },
  { image: '/images/products/nam-linh-chi.jpg', alt: 'Tai nấm linh chi đỏ' },
  { image: '/images/products/hat-sen.jpg', alt: 'Hạt sen khô' },
  { image: '/images/products/long-nhan.jpg', alt: 'Long nhãn sấy khô' },
  { image: '/images/products/tinh-dau-oai-huong.jpg', alt: 'Hoa oải hương trên cánh đồng' },
];

export const materialsIntro = {
  eyebrow: 'Từ thiên nhiên',
  title: 'Những nguyên liệu chúng tôi trân trọng',
  description:
    'Mỗi loại dược liệu đều mang trong mình giá trị riêng biệt từ thiên nhiên ban tặng.',
  actionLabel: 'Khám phá cửa hàng',
};

export const closingCta = {
  title: 'Khám phá dược liệu thuần nhiên cho cuộc sống khỏe mạnh hơn.',
  description:
    'Chúng tôi luôn sẵn sàng đồng hành cùng bạn trên hành trình chăm sóc sức khỏe từ thiên nhiên.',
  actionLabel: 'Khám phá ngay',
  image: '/images/products/tra-hoa-cuc.jpg',
  alt: 'Hoa cúc khô đang được hãm trong ấm sứ',
};
