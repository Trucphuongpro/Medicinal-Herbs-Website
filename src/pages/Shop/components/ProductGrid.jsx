import ProductCard from '../../../components/product/ProductCard';
import styles from './ProductGrid.module.css';

function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className={styles.emptyState}>
        <h2>Chưa có sản phẩm phù hợp</h2>
        <p>Hãy thử đổi bộ lọc để xem thêm các sản phẩm dược liệu khác.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
