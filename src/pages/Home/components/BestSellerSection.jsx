import SectionHeader from '../../../components/common/SectionHeader';
import ProductCard from '../../../components/product/ProductCard';
import { bestSellerBenefits, bestSellerProducts } from '../homeData';
import styles from './BestSellerSection.module.css';

function BestSellerSection() {
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
          {bestSellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestSellerSection;
