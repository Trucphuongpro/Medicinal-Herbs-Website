/**
 * Du lieu mau cho catalog duoc lieu.
 * Anh nam trong websiteduoclieu_fe/public/images/products (nguon: Wikimedia Commons).
 */

export interface SeedProduct {
  slug: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface SeedCategory {
  name: string;
  products: SeedProduct[];
}

const img = (slug: string) => `/images/products/${slug}.jpg`;

export const imageUrlFor = img;

export const CATEGORIES: SeedCategory[] = [
  {
    name: 'Thảo dược quý',
    products: [
      {
        slug: 'nhan-sam-han-quoc',
        name: 'Nhân sâm Hàn Quốc 6 năm tuổi',
        description:
          'Củ nhân sâm Hàn Quốc thu hoạch đủ 6 năm, hàm lượng saponin cao. Hỗ trợ bồi bổ khí huyết, tăng sức đề kháng và giảm mệt mỏi kéo dài. Dùng ngâm mật ong, hầm gà hoặc thái lát hãm trà.',
        price: 2450000,
        stock: 18,
      },
      {
        slug: 'sam-ngoc-linh',
        name: 'Sâm Ngọc Linh Kon Tum trồng 8 năm',
        description:
          'Sâm Ngọc Linh — quốc bảo dược liệu Việt Nam, trồng dưới tán rừng Kon Tum ở độ cao trên 1.500m. Giàu majonoside R2, hỗ trợ phục hồi thể trạng cho người mới ốm dậy.',
        price: 8900000,
        stock: 5,
      },
      {
        slug: 'dong-trung-ha-thao',
        name: 'Đông trùng hạ thảo sấy thăng hoa 20g',
        description:
          'Sợi đông trùng hạ thảo nuôi cấy hữu cơ, sấy thăng hoa giữ trọn cordycepin và adenosine. Hỗ trợ chức năng hô hấp, cải thiện giấc ngủ và tăng cường sinh lực.',
        price: 1690000,
        stock: 32,
      },
      {
        slug: 'nam-linh-chi',
        name: 'Nấm linh chi đỏ Quảng Nam 500g',
        description:
          'Linh chi đỏ tai dày, vân bóng, trồng trên gỗ tự nhiên. Hỗ trợ giải độc gan, ổn định huyết áp và an thần. Thái lát sắc nước uống hằng ngày.',
        price: 780000,
        stock: 46,
      },
      {
        slug: 'tam-that-bac',
        name: 'Tam thất bắc củ nguyên 250g',
        description:
          'Củ tam thất bắc Hà Giang phơi khô tự nhiên, chắc củ, ít xơ. Bổ huyết, cầm máu, hỗ trợ phụ nữ sau sinh và người sau phẫu thuật.',
        price: 560000,
        stock: 40,
      },
      {
        slug: 'dang-sam',
        name: 'Đảng sâm rừng Tây Bắc 500g',
        description:
          'Đảng sâm (sâm dây) rễ to, vị ngọt thanh. Bổ tỳ vị, kiện gân cốt, thích hợp hầm canh hoặc ngâm rượu cho người ăn kém, mệt mỏi.',
        price: 420000,
        stock: 55,
      },
    ],
  },
  {
    name: 'Trà thảo mộc',
    products: [
      {
        slug: 'tra-hoa-cuc',
        name: 'Trà hoa cúc sấy lạnh 100g',
        description:
          'Hoa cúc chi vàng sấy lạnh giữ nguyên cánh và hương thơm dịu. Thanh nhiệt, sáng mắt, giúp dễ ngủ. Hãm 3-5 bông với nước 85°C trong 5 phút.',
        price: 165000,
        stock: 120,
      },
      {
        slug: 'tra-atiso',
        name: 'Trà atisô Đà Lạt túi lọc 50 gói',
        description:
          'Bông và thân atisô Đà Lạt, đóng túi lọc tiện dụng. Hỗ trợ mát gan, lợi mật, giảm mụn do nóng trong. Uống 2-3 gói mỗi ngày.',
        price: 95000,
        stock: 200,
      },
      {
        slug: 'tra-gung',
        name: 'Trà gừng mật ong hòa tan 20 gói',
        description:
          'Gừng ta cô đặc kết hợp mật ong rừng, vị cay ấm dễ uống. Làm ấm bụng, giảm cảm lạnh và say tàu xe. Pha với 150ml nước nóng.',
        price: 78000,
        stock: 240,
      },
      {
        slug: 'tra-sen',
        name: 'Trà tim sen Đồng Tháp 150g',
        description:
          'Tim sen sao vàng hạ thổ theo cách truyền thống, vị đắng hậu ngọt. An thần, hỗ trợ người khó ngủ và huyết áp cao.',
        price: 135000,
        stock: 88,
      },
      {
        slug: 'tra-giao-co-lam',
        name: 'Trà giảo cổ lam 5 lá 200g',
        description:
          'Giảo cổ lam 5 lá thu hái tự nhiên trên núi đá Hòa Bình. Hỗ trợ hạ mỡ máu, ổn định đường huyết và giảm cân an toàn.',
        price: 145000,
        stock: 96,
      },
      {
        slug: 'tra-hoa-hoe',
        name: 'Trà hoa hòe sao vàng 200g',
        description:
          'Nụ hoa hòe giàu rutin, sao vàng thơm nhẹ. Hỗ trợ bền thành mạch, giảm nguy cơ trĩ và cao huyết áp. Hãm nước sôi 10 phút.',
        price: 118000,
        stock: 110,
      },
    ],
  },
  {
    name: 'Tinh dầu thiên nhiên',
    products: [
      {
        slug: 'tinh-dau-tram',
        name: 'Tinh dầu tràm Huế nguyên chất 50ml',
        description:
          'Chưng cất hơi nước từ lá tràm gió Phú Lộc, Huế. An toàn cho trẻ sơ sinh: chống muỗi, giữ ấm, giảm ho khi trở trời. Xoa lòng bàn chân hoặc nhỏ vào nước tắm.',
        price: 185000,
        stock: 150,
      },
      {
        slug: 'tinh-dau-sa-chanh',
        name: 'Tinh dầu sả chanh 30ml',
        description:
          'Tinh dầu sả chanh nguyên chất 100%, hương tươi mát. Đuổi muỗi, khử mùi và làm sạch không khí. Dùng cho máy khuếch tán hoặc pha nước lau nhà.',
        price: 96000,
        stock: 180,
      },
      {
        slug: 'tinh-dau-bac-ha',
        name: 'Tinh dầu bạc hà Nhật 20ml',
        description:
          'Hàm lượng menthol cao, cảm giác the mát tức thì. Giảm đau đầu, thông mũi, tỉnh táo khi lái xe. Chỉ dùng 1-2 giọt pha loãng.',
        price: 128000,
        stock: 140,
      },
      {
        slug: 'tinh-dau-que',
        name: 'Tinh dầu quế Trà Bồng 50ml',
        description:
          'Chiết xuất từ vỏ quế Trà Bồng, hương ấm nồng đặc trưng. Khử khuẩn không khí, xua côn trùng và tạo cảm giác ấm áp cho phòng khách mùa lạnh.',
        price: 155000,
        stock: 125,
      },
      {
        slug: 'tinh-dau-oai-huong',
        name: 'Tinh dầu oải hương Pháp 20ml',
        description:
          'Lavandula angustifolia nhập khẩu từ Provence, hương hoa dịu nhẹ. Thư giãn thần kinh, hỗ trợ giấc ngủ sâu. Khuếch tán 30 phút trước khi ngủ.',
        price: 265000,
        stock: 70,
      },
    ],
  },
  {
    name: 'Dược liệu khô',
    products: [
      {
        slug: 'ky-tu',
        name: 'Kỷ tử Ninh Hạ loại 1 - 500g',
        description:
          'Kỷ tử đỏ Ninh Hạ hạt to, mọng, ngọt tự nhiên, không chất bảo quản. Bổ can thận, sáng mắt. Dùng nấu chè, hầm canh hoặc hãm trà cùng táo đỏ.',
        price: 220000,
        stock: 160,
      },
      {
        slug: 'tao-do',
        name: 'Táo đỏ Tân Cương sấy khô 500g',
        description:
          'Táo đỏ cỡ lớn, thịt dày, vị ngọt đậm. Bổ huyết, an thần, hợp với người thiếu máu và phụ nữ sau sinh. Kết hợp kỷ tử làm trà dưỡng nhan.',
        price: 175000,
        stock: 190,
      },
      {
        slug: 'long-nhan',
        name: 'Long nhãn Hưng Yên sấy 300g',
        description:
          'Nhãn lồng Hưng Yên bóc tay, sấy khô giữ vị ngọt thanh và mùi thơm đặc trưng. Bổ tâm tỳ, dưỡng huyết, dùng nấu chè sen long nhãn.',
        price: 195000,
        stock: 105,
      },
      {
        slug: 'hat-sen',
        name: 'Hạt sen khô Huế 500g',
        description:
          'Hạt sen Huế đã bỏ tim, hạt tròn đều, bở bùi khi nấu. Bổ tỳ, dưỡng tâm, an thần. Dùng nấu chè, hầm gà hoặc cháo cho người mất ngủ.',
        price: 168000,
        stock: 145,
      },
      {
        slug: 'cam-thao',
        name: 'Cam thảo bắc thái lát 200g',
        description:
          'Cam thảo bắc thái lát mỏng, vị ngọt hậu. Điều hòa vị thuốc, bổ tỳ, giảm ho và làm dịu họng. Thường phối cùng hoa cúc, atisô.',
        price: 85000,
        stock: 210,
      },
      {
        slug: 'que-chi',
        name: 'Quế chi Trà Bồng 300g',
        description:
          'Cành quế non phơi khô, tinh dầu cao, thơm ngọt. Làm ấm cơ thể, hỗ trợ tuần hoàn, dùng pha trà hoặc làm gia vị món hầm.',
        price: 110000,
        stock: 130,
      },
      {
        slug: 'duong-quy',
        name: 'Đương quy Tây Bắc thái lát 250g',
        description:
          'Đương quy trồng tại Sa Pa, lát dày đều, mùi thơm nồng. Bổ huyết, điều kinh, giảm đau — vị thuốc quen thuộc cho phụ nữ.',
        price: 245000,
        stock: 78,
      },
      {
        slug: 'bach-chi',
        name: 'Bạch chỉ phiến 250g',
        description:
          'Rễ bạch chỉ thái phiến, trắng ngà, thơm hắc nhẹ. Tán phong hàn, thông mũi, giảm đau đầu do cảm lạnh và viêm xoang.',
        price: 132000,
        stock: 92,
      },
      {
        slug: 'nghe-den',
        name: 'Nghệ đen thái lát 300g',
        description:
          'Nga truật (nghệ đen) thái lát phơi khô. Hành khí, tiêu tích, hỗ trợ tiêu hóa kém và đầy bụng. Sắc uống hoặc tán bột.',
        price: 125000,
        stock: 84,
      },
      {
        slug: 'dinh-lang',
        name: 'Rễ đinh lăng 5 năm tuổi 500g',
        description:
          'Rễ đinh lăng nếp lá nhỏ trồng đủ 5 năm — "nhân sâm của người nghèo". Bổ khí, tăng trí nhớ, lợi sữa. Ngâm rượu hoặc sắc nước.',
        price: 285000,
        stock: 66,
      },
      {
        slug: 'xuyen-tam-lien',
        name: 'Xuyên tâm liên khô 200g',
        description:
          'Toàn cây xuyên tâm liên phơi khô, vị rất đắng. Thanh nhiệt, giải độc, hỗ trợ viêm họng và cảm sốt. Dùng theo liều khuyến nghị.',
        price: 98000,
        stock: 115,
      },
    ],
  },
  {
    name: 'Cao & viên hoàn',
    products: [
      {
        slug: 'cao-atiso',
        name: 'Cao atisô Đà Lạt cô đặc 200g',
        description:
          'Cô đặc từ 10kg atisô tươi cho mỗi hũ, sánh mịn, không đường hóa học. Mát gan, lợi tiểu, giảm men gan. Pha 1 thìa với nước ấm.',
        price: 235000,
        stock: 88,
      },
      {
        slug: 'vien-nghe-mat-ong',
        name: 'Viên nghệ mật ong 500g',
        description:
          'Tinh bột nghệ vàng nguyên chất vo viên cùng mật ong rừng. Hỗ trợ viêm loét dạ dày, làm đẹp da. Ngày 2 lần, mỗi lần 5-7 viên trước ăn.',
        price: 320000,
        stock: 102,
      },
      {
        slug: 'vien-ha-thu-o',
        name: 'Viên hà thủ ô đỏ chế đậu đen 300g',
        description:
          'Hà thủ ô đỏ chín kỹ 9 lần với đậu đen theo cổ truyền, đã khử chát. Bổ huyết, dưỡng tóc, hỗ trợ tóc bạc sớm và rụng tóc.',
        price: 275000,
        stock: 74,
      },
      {
        slug: 'cao-la-vang',
        name: 'Cao lá vằng Quảng Trị 100g',
        description:
          'Lá vằng sẻ Quảng Trị nấu cô thành cao. Lợi sữa, kháng khuẩn, giúp sản phụ nhanh phục hồi. Pha 1 viên nhỏ với 200ml nước nóng.',
        price: 189000,
        stock: 96,
      },
    ],
  },
  {
    name: 'Mật ong & siro',
    products: [
      {
        slug: 'mat-ong-rung',
        name: 'Mật ong rừng U Minh 1 lít',
        description:
          'Mật ong rừng tràm U Minh Hạ, khai thác theo mùa bông tràm, màu hổ phách, thơm đặc trưng. Không pha đường, không lọc công nghiệp.',
        price: 480000,
        stock: 60,
      },
      {
        slug: 'mat-ong-nghe',
        name: 'Mật ong ngâm nghệ tươi 500ml',
        description:
          'Nghệ vàng tươi thái lát ngâm mật ong hoa nhãn tối thiểu 3 tháng. Hỗ trợ dạ dày, tăng đề kháng. Dùng 1-2 thìa mỗi sáng khi bụng đói.',
        price: 265000,
        stock: 108,
      },
      {
        slug: 'siro-hung-chanh',
        name: 'Siro húng chanh mật ong 200ml',
        description:
          'Lá húng chanh (tần dày lá) chưng cùng mật ong và đường phèn. Giảm ho, long đờm, dịu họng — an toàn cho trẻ trên 1 tuổi.',
        price: 145000,
        stock: 175,
      },
      {
        slug: 'siro-ho-tac',
        name: 'Siro tắc chưng đường phèn 250ml',
        description:
          'Quả tắc (quất) chưng cách thủy với đường phèn và gừng. Vị chua ngọt dễ uống, giúp giảm ho khan và khàn tiếng. Pha nước ấm hoặc ngậm trực tiếp.',
        price: 118000,
        stock: 190,
      },
    ],
  },
];

export const SEED_USERS = [
  { fullname: 'Nguyễn Trúc Phương', email: 'admin@duoclieu.vn', role: 'ADMIN' as const },
  { fullname: 'Trần Minh Khoa', email: 'khoa.tran@gmail.com', role: 'USER' as const },
  { fullname: 'Lê Thị Hồng Nhung', email: 'nhung.le@gmail.com', role: 'USER' as const },
  { fullname: 'Phạm Quốc Đạt', email: 'dat.pham@gmail.com', role: 'USER' as const },
  { fullname: 'Vũ Thanh Hà', email: 'ha.vu@gmail.com', role: 'USER' as const },
  { fullname: 'Đỗ Gia Bảo', email: 'bao.do@gmail.com', role: 'USER' as const },
  { fullname: 'Hoàng Mai Anh', email: 'maianh.hoang@gmail.com', role: 'USER' as const },
  { fullname: 'Ngô Tuấn Kiệt', email: 'kiet.ngo@gmail.com', role: 'USER' as const },
];

/** Cac cau nhan xet mau, gan theo diem rating. */
export const REVIEW_TEMPLATES: Record<number, string[]> = {
  5: [
    'Hàng đóng gói kỹ, thơm mùi dược liệu thật. Dùng được hơn tuần thấy ngủ ngon hẳn.',
    'Chất lượng vượt mong đợi so với giá. Shop tư vấn liều dùng rất tận tình.',
    'Mua lần thứ ba rồi, lần nào cũng đều hàng. Sẽ giới thiệu cho người nhà.',
    'Giao nhanh trong hai ngày, sản phẩm có tem và hạn sử dụng rõ ràng.',
    'Mẹ mình khen ngon và dễ uống, chắc chắn sẽ đặt thêm.',
  ],
  4: [
    'Sản phẩm tốt, chỉ tiếc là bao bì hơi đơn giản so với giá tiền.',
    'Dùng thấy ổn, hiệu quả từ từ chứ không nhanh như quảng cáo. Vẫn đáng tiền.',
    'Chất lượng ổn định, giao hàng hơi chậm một hôm so với hẹn.',
    'Vị hơi đắng lúc đầu nhưng quen dần. Nhìn chung hài lòng.',
  ],
  3: [
    'Tạm ổn so với giá. Mong shop cải thiện khâu đóng gói chống ẩm.',
    'Hàng đúng mô tả nhưng chưa thấy khác biệt rõ sau hai tuần dùng.',
    'Sản phẩm bình thường, có thể mua lại nếu có khuyến mãi.',
  ],
  2: [
    'Nhận hàng thấy hơi vụn, chắc do vận chuyển. Shop hỗ trợ đổi nhưng mất thời gian.',
    'Mùi không thơm như lần mua trước, hy vọng shop kiểm tra lại lô hàng.',
  ],
};

export const SHIPPING_ADDRESSES = [
  '128 Nguyễn Huệ, phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  '45 Trần Hưng Đạo, phường Hàng Bài, quận Hoàn Kiếm, Hà Nội',
  '212 Lê Duẩn, phường Thanh Bình, quận Hải Châu, Đà Nẵng',
  '77 Hùng Vương, phường Phú Nhuận, TP. Huế',
  '9/3 Phan Đình Phùng, phường 2, TP. Đà Lạt, Lâm Đồng',
  '301 Nguyễn Văn Cừ, phường An Hòa, quận Ninh Kiều, Cần Thơ',
];

export const PHONES = [
  '0901234567',
  '0912345678',
  '0938765432',
  '0977123456',
  '0964558899',
  '0356741289',
];
