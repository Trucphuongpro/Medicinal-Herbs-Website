import ProductFormView from './ProductFormView';

const productFormInitialValues = {
  name: '',
  category: '',
  price: '0',
  salePrice: '0',
  unit: 'Sản phẩm',
  stock: '0',
  ingredients: '',
  benefits: '',
  usage: '',
  description: '',
  status: 'active',
  image: '',
};

function ProductCreatePage() {
  return (
    <ProductFormView
      title="Thêm sản phẩm"
      subtitle="Tạo nhanh một sản phẩm mới với đầy đủ thông tin, media và nội dung chuyên môn."
      initialValues={productFormInitialValues}
      primaryButtonLabel="Lưu sản phẩm"
      mode="create"
    />
  );
}

export default ProductCreatePage;
