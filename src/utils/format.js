export const formatCurrency = (amount, locale = 'vi-VN', currency = 'VND') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount ?? 0);
};

export const formatDate = (date, locale = 'vi-VN') => {
  if (!date) return '';
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
};
