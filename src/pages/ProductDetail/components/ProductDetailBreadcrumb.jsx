import Breadcrumb from '../../../components/common/Breadcrumb';

function ProductDetailBreadcrumb({ productName }) {
  const items = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Cửa hàng', path: '/shop' },
    { label: productName },
  ];

  return <Breadcrumb items={items} />;
}

export default ProductDetailBreadcrumb;
