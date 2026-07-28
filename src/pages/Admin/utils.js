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
