import { formatCurrency, formatDate } from './format';

const ORDER_STATUS_LABELS = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  paid: 'Đã thanh toán',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  completed: 'Hoàn tất',
  canceled: 'Đã hủy',
};

const ORDER_STATUS_KEYS = {
  pending: 'pending',
  confirmed: 'processing',
  paid: 'processing',
  shipping: 'shipping',
  delivered: 'delivered',
  completed: 'delivered',
  canceled: 'cancelled',
};

const slugify = (value = '') =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const mapCategoryToCard = (category) => ({
  id: category.id,
  name: category.name,
  description: `Hiện có ${category.products?.length ?? 0} sản phẩm trong danh mục này.`,
  highlight: `${category.products?.length ?? 0} sản phẩm`,
  icon: category.name?.charAt(0)?.toUpperCase() ?? 'D',
});

export const mapProductToCard = (product, reviews = []) => {
  const rating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length
      : 0;

  return {
    id: product.id,
    name: product.name,
    image: product.image,
    price: Number(product.price ?? 0),
    category: product.category?.name ?? '',
    rating,
    stock: Number(product.stock ?? 0),
    description: product.description ?? '',
    createdAt: product.created_at,
    categoryId: product.category_id,
    filterKey: slugify(product.category?.name ?? ''),
  };
};

export const mapProductDetail = (product, reviews = []) => {
  const mappedProduct = mapProductToCard(product, reviews);
  const reviewCount = reviews.length;
  const averageRating = mappedProduct.rating;
  const description = product.description?.trim() || 'Chưa có mô tả chi tiết cho sản phẩm này.';
  const descriptionParts = description
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    ...mappedProduct,
    gallery: [
      {
        id: product.id,
        src: product.image || '/placeholder-product.png',
        alt: product.name,
      },
    ],
    reviewCount,
    stockCount: Number(product.stock ?? 0),
    stockLabel: Number(product.stock ?? 0) > 0 ? 'Còn hàng' : 'Hết hàng',
    shortDescription: descriptionParts[0] ?? description,
    description,
    ingredients: descriptionParts.length > 1 ? descriptionParts : [description],
    usage: ['Dùng theo hướng dẫn của sản phẩm hoặc tư vấn từ cửa hàng.'],
    badges: [
      product.category?.name ?? 'Dược liệu',
      Number(product.stock ?? 0) > 0 ? 'Sẵn kho' : 'Tạm hết hàng',
    ],
    reviews: reviews.map(mapReviewToCard),
    rating: averageRating,
  };
};

export const mapReviewToCard = (review) => ({
  id: review.id,
  name: review.user?.fullname ?? 'Khách hàng',
  date: review.created_at,
  rating: Number(review.rating ?? 0),
  content: review.comment ?? 'Khách hàng chưa để lại nhận xét chi tiết.',
});

export const mapCartItem = (item) => ({
  id: item.id,
  productId: item.product?.id,
  name: item.product?.name ?? 'Sản phẩm',
  image: item.product?.image || '/placeholder-product.png',
  category: item.product?.category?.name ?? '',
  note: item.product?.description ?? 'Sản phẩm đang có trong giỏ hàng của bạn.',
  price: Number(item.price ?? 0),
  quantity: Number(item.quantity ?? 0),
  maxQuantity: Number(item.product?.stock ?? item.quantity ?? 1),
});

export const mapOrderToCard = (order) => {
  const itemCount = order.items?.reduce((sum, item) => sum + Number(item.quantity ?? 0), 0) ?? 0;

  return {
    id: order.id,
    date: formatDate(order.created_at),
    statusKey: ORDER_STATUS_KEYS[order.status] ?? 'pending',
    statusLabel: ORDER_STATUS_LABELS[order.status] ?? order.status,
    total: formatCurrency(Number(order.total_price ?? 0)),
    details: `${itemCount} sản phẩm • ${order.payment_method}`,
    phone: order.phone,
    shippingAddress: order.shipping_address,
    rawStatus: order.status,
    items: order.items ?? [],
  };
};

export const mapProfile = (user, orders = []) => ({
  fullName: user.fullname ?? '',
  email: user.email ?? '',
  phone: user.phone ?? '',
  birthday: user.birthday ?? '',
  memberSince: user.created_at ? new Date(user.created_at).getFullYear().toString() : '',
  totalOrders: orders.length,
  defaultAddressLabel: orders[0]?.shipping_address ? 'Đơn gần nhất' : 'Chưa có',
});

export const buildShippingAddress = (formState) =>
  [formState.address, formState.ward, formState.district, formState.province]
    .map((item) => item?.trim())
    .filter(Boolean)
    .join(', ');
