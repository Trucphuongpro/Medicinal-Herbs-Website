import ProductCard from '../../../components/product/ProductCard';
import styles from './RelatedProducts.module.css';

function RelatedProducts({ products }) {
  if (!products.length) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Sản phẩm liên quan</h2>
        <p className={styles.description}>
          Các gợi ý bổ sung giúp người dùng khám phá thêm nhóm sản phẩm gần nhu cầu hiện tại.
        </p>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default RelatedProducts;
