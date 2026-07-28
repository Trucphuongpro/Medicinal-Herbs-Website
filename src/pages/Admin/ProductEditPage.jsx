import ProductFormView from './ProductFormView';
import { editProductInitialValues, products } from '../../mocks/adminData';

function ProductEditPage() {
  return (
    <ProductFormView
      title="Sửa sản phẩm"
      subtitle="Form chỉnh sửa được prefill bằng mock data để mô phỏng trải nghiệm biên tập trong admin."
      initialValues={editProductInitialValues}
      heroImages={[{ src: products[0].image, label: 'Ảnh hiện tại' }]}
      galleryImages={products.slice(0, 4).map((item, index) => ({
        src: item.image,
        label: `Ảnh ${index + 1}`,
      }))}
      primaryButtonLabel="Cập nhật sản phẩm"
    />
  );
}

export default ProductEditPage;
