import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import productService from '../../services/product.service';
import ProductFormView from './ProductFormView';

function ProductEditPage() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const product = await productService.getById(id);
        setInitialValues({
          name: product.name ?? '',
          category: product.category_id ?? '',
          price: String(Number(product.price ?? 0)),
          salePrice: String(Number(product.price ?? 0)),
          unit: 'Sản phẩm',
          stock: String(Number(product.stock ?? 0)),
          ingredients: '',
          benefits: '',
          usage: '',
          description: product.description ?? '',
          status: Number(product.stock ?? 0) > 0 ? 'active' : 'out_of_stock',
          image: product.image ?? '',
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Không thể tải sản phẩm để chỉnh sửa.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <Loading fullScreen text="Đang tải sản phẩm..." />;
  }

  if (error || !initialValues) {
    return <ErrorState message={error || 'Không tìm thấy sản phẩm.'} />;
  }

  return (
    <ProductFormView
      title="Sửa sản phẩm"
      subtitle="Form chỉnh sửa đang prefill từ dữ liệu thật của backend."
      initialValues={initialValues}
      primaryButtonLabel="Cập nhật sản phẩm"
      mode="edit"
      productId={id}
    />
  );
}

export default ProductEditPage;
