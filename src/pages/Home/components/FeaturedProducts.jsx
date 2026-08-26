import { Link } from 'react-router-dom';
import EmptyState from '../../../components/common/EmptyState';
import SectionHeader from '../../../components/common/SectionHeader';
import ProductCard from '../../../components/product/ProductCard';
import styles from './FeaturedProducts.module.css';

function FeaturedProducts({ products = [] }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.headerRow}>
          <SectionHeader
            eyebrow="Sản phẩm chọn lọc"
            title="Những lựa chọn dễ bắt đầu cho người yêu thảo mộc."
          />

          <Link to="/shop" className={styles.link}>
            Xem toàn bộ sản phẩm
          </Link>
        </div>

        {products.length ? (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Chưa có sản phẩm nổi bật"
            description="Cửa hàng đang cập nhật sản phẩm mới."
          />
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
