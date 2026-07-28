import ProductFormView from './ProductFormView';
import { productFormInitialValues, products } from '../../mocks/adminData';

function ProductCreatePage() {
  return (
    <ProductFormView
      title="Thêm sản phẩm"
      subtitle="Tạo nhanh một sản phẩm mới với đầy đủ thông tin, media và nội dung chuyên môn."
      initialValues={productFormInitialValues}
      heroImages={[{ src: products[0].image, label: 'Ảnh đại diện gợi ý' }]}
      galleryImages={products.slice(0, 3).map((item, index) => ({
        src: item.image,
        label: `Gallery ${index + 1}`,
      }))}
      primaryButtonLabel="Lưu sản phẩm"
    />
  );
}

export default ProductCreatePage;
