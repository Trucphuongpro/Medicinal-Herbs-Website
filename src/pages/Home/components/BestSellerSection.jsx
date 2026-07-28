import EmptyState from '../../../components/common/EmptyState';
import SectionHeader from '../../../components/common/SectionHeader';
import ProductCard from '../../../components/product/ProductCard';
import { bestSellerBenefits } from '../homeData';
import styles from './BestSellerSection.module.css';

function BestSellerSection({ products = [] }) {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <SectionHeader
            eyebrow="Best seller"
            title="Các sản phẩm được quay lại mua nhiều nhất."
            description="Khu vực dành cho những lựa chọn đã được khách hàng kiểm chứng về độ tiện dùng, hương vị và tính thẩm mỹ khi làm quà."
          />

          <div className={styles.benefits}>
            {bestSellerBenefits.map((benefit) => (
              <div key={benefit} className={styles.benefitItem}>
                <span className={styles.benefitIcon} aria-hidden="true">
                  ✓
                </span>
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.products}>
          {products.length ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <EmptyState
              title="Chưa có sản phẩm bán chạy"
              description="Khu vực này sẽ hiển thị khi backend có dữ liệu sản phẩm."
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default BestSellerSection;
