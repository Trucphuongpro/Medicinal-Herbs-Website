import { Link } from 'react-router-dom';
import SectionHeader from '../../../components/common/SectionHeader';
import ProductCard from '../../../components/product/ProductCard';
import { featuredProducts } from '../homeData';
import styles from './FeaturedProducts.module.css';

function FeaturedProducts() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.headerRow}>
          <SectionHeader
            eyebrow="Sản phẩm chọn lọc"
            title="Những lựa chọn dễ bắt đầu cho người yêu thảo mộc."
            description="Ưu tiên các sản phẩm có trải nghiệm dùng hằng ngày, công dụng quen thuộc và hình thức gọn gàng."
          />

          <Link to="/shop" className={styles.link}>
            Xem toàn bộ sản phẩm
          </Link>
        </div>

        <div className={styles.grid}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
