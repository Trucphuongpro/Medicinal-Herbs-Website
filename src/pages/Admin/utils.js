export function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('vi-VN').format(new Date(value));
}

export function mapProductStatus(status) {
  return status === 'out_of_stock' ? 'Hết hàng' : undefined;
}

export function normalizeAdminStatus(status, stock = 0) {
  if (status) return status;
  return Number(stock) > 0 ? 'active' : 'out_of_stock';
}

export function mapApiProductToAdminRow(product) {
  return {
    id: product.id,
    name: product.name,
    sku: product.id.slice(0, 8).toUpperCase(),
    category: product.category_id,
    categoryLabel: product.category?.name ?? 'Chưa phân loại',
    price: Number(product.price ?? 0),
    salePrice: Number(product.price ?? 0),
    unit: 'Sản phẩm',
    stock: Number(product.stock ?? 0),
    status: normalizeAdminStatus('', product.stock),
    createdAt: product.created_at,
    image: product.image || 'https://placehold.co/600x400?text=Duoc+Lieu',
    description: product.description ?? '',
  };
}

export function mapApiCategoryToAdminRow(category) {
  return {
    id: category.id,
    name: category.name,
    slug: category.name
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''),
    description:
      category.products?.length > 0
        ? `Có ${category.products.length} sản phẩm trong danh mục này.`
        : 'Danh mục chưa có sản phẩm nào.',
    productCount: category.products?.length ?? 0,
    status: 'active',
  };
}

export function mapApiOrderToAdminRow(order) {
  return {
    id: order.id,
    customer: order.user?.fullname ?? order.user_id?.slice(0, 8) ?? 'Khách hàng',
    date: order.created_at,
    total: Number(order.total_price ?? 0),
    status: mapOrderStatusToAdmin(order.status),
    payment: formatPaymentMethod(order.payment_method),
    phone: order.phone,
    address: order.shipping_address,
    rawStatus: order.status,
  };
}

export function mapOrderStatusToAdmin(status) {
  const statusMap = {
    pending: 'pending',
    confirmed: 'processing',
    paid: 'processing',
    shipping: 'shipping',
    delivered: 'completed',
    completed: 'completed',
    canceled: 'cancelled',
  };

  return statusMap[status] ?? 'pending';
}

export function formatPaymentMethod(method) {
  const labelMap = {
    cod: 'Thanh toán khi nhận hàng',
    bank_transfer: 'Chuyển khoản ngân hàng',
    vnpay: 'VNPay',
    momo: 'MoMo',
  };

  return labelMap[method] ?? method ?? 'Chưa rõ';
}

export function buildProductPayload(formValues) {
  return {
    name: formValues.name.trim(),
    category_id: formValues.category,
    description: formValues.description.trim(),
    price: Number(formValues.price),
    stock: Number(formValues.stock),
    image: formValues.image?.trim() || undefined,
  };
}

export function buildCategoryPayload(name) {
  return {
    name: name.trim(),
  };
}

export function mapApiUserToAdminRow(user) {
  return {
    id: user.id,
    name: user.fullname ?? 'Người dùng',
    email: user.email ?? '',
    phone: user.phone ?? 'Chưa có',
    role: String(user.role ?? 'USER').toLowerCase(),
    status: user.is_active ? 'active' : 'inactive',
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.fullname ?? user.email ?? 'User',
    )}&background=E8F5E9&color=1B4332`,
    rawRole: user.role,
    isActive: Boolean(user.is_active),
  };
}

export function mapApiReviewToAdminRow(review) {
  return {
    id: review.id,
    user: review.user?.fullname ?? 'Khách hàng',
    product: review.product?.name ?? review.product_id,
    rating: Number(review.rating ?? 0),
    content: review.comment ?? 'Chưa có nhận xét.',
    date: review.created_at,
    status: review.is_hidden ? 'hidden' : 'visible',
    isHidden: Boolean(review.is_hidden),
  };
}
