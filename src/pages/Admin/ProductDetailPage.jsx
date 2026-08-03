import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader, StatusBadge } from '../../components/admin';
import { products } from '../../mocks/adminData';
import { formatCurrency, formatDate } from './utils';
import styles from '../../components/admin/AdminShared.module.css';

function ProductDetailPage() {
  const { id } = useParams();

  const product = useMemo(
    () => products.find((item) => item.id === id) || products[0],
    [id],
  );

  return (
    <section className={styles.page}>
      <PageHeader
        title={`Chi tiết sản phẩm ${product.name}`}
        subtitle="Trang xem nhanh thông tin sản phẩm trong luồng quản trị."
        actions={<StatusBadge status={product.status} />}
      />

      <div className={styles.gridTwo}>
        <div className={styles.formSection}>
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '1.2rem', maxHeight: '26rem', objectFit: 'cover' }} />
        </div>

        <div className={styles.formSection}>
          <div className={styles.summaryList}>
            <div className={styles.summaryItem}><span>Mã sản phẩm</span><strong>{product.id}</strong></div>
            <div className={styles.summaryItem}><span>SKU</span><strong>{product.sku}</strong></div>
            <div className={styles.summaryItem}><span>Danh mục</span><strong>{product.categoryLabel}</strong></div>
            <div className={styles.summaryItem}><span>Giá</span><strong>{formatCurrency(product.price)}</strong></div>
            <div className={styles.summaryItem}><span>Giá khuyến mãi</span><strong>{formatCurrency(product.salePrice)}</strong></div>
            <div className={styles.summaryItem}><span>Tồn kho</span><strong>{product.stock}</strong></div>
            <div className={styles.summaryItem}><span>Ngày tạo</span><strong>{formatDate(product.createdAt)}</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
