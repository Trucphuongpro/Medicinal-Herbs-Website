import EmptyState from '../../../components/common/EmptyState';
import SectionHeader from '../../../components/common/SectionHeader';
import ProductCard from '../../../components/product/ProductCard';
import styles from './BestSellerSection.module.css';

function BestSellerSection({ products = [] }) {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <SectionHeader
          eyebrow="Best seller"
          title="Các sản phẩm được quay lại mua nhiều nhất."
        />

        <div className={styles.products}>
          {products.length ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <EmptyState
              title="Chưa có sản phẩm bán chạy"
              description="Cửa hàng đang cập nhật sản phẩm bán chạy."
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default BestSellerSection;
