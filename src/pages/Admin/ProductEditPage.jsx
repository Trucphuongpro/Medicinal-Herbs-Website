import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductFormView from './ProductFormView';
import { editProductInitialValues, products } from '../../mocks/adminData';

function ProductEditPage() {
  const { id } = useParams();
  const product = useMemo(() => products.find((item) => item.id === id) || products[0], [id]);

  return (
    <ProductFormView
      title="Sửa sản phẩm"
      subtitle="Form chỉnh sửa được prefill bằng mock data để mô phỏng trải nghiệm biên tập trong admin."
      initialValues={{
        ...editProductInitialValues,
        name: product.name,
        category: product.category,
        price: String(product.price),
        salePrice: String(product.salePrice),
        stock: String(product.stock),
        status: product.status,
      }}
      heroImages={[{ src: product.image, label: 'Ảnh hiện tại' }]}
      galleryImages={products.slice(0, 4).map((item, index) => ({
        src: item.image,
        label: `Ảnh ${index + 1}`,
      }))}
      primaryButtonLabel="Cập nhật sản phẩm"
    />
  );
}

export default ProductEditPage;
