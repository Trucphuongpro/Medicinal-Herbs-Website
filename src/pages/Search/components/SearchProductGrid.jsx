import ProductCard from '../../../components/product/ProductCard';
import styles from './SearchProductGrid.module.css';

function SearchProductGrid({ products, query }) {
  if (!products.length) {
    return (
      <div className={styles.emptyState}>
        <h2>Không tìm thấy kết quả phù hợp</h2>
        <p>
          {query
            ? `Chưa có sản phẩm mock phù hợp với từ khóa "${query}". Hãy thử một từ khóa khác.`
            : 'Hãy nhập từ khóa để xem danh sách sản phẩm phù hợp.'}
        </p>
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

export default SearchProductGrid;
