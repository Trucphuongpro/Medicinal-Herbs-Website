import Button from '../../../components/common/Button';
import Rating from '../../../components/common/Rating';
import { formatCurrency } from '../../../utils/format';
import styles from './ProductInformation.module.css';

function ProductInformation({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.category}>{product.category}</span>
        <h1 className={styles.title}>{product.name}</h1>
        <div className={styles.ratingRow}>
          <Rating value={product.rating} showCount count={product.reviewCount} />
          <span className={styles.stock}>{product.stockLabel}</span>
        </div>
      </div>

      <div className={styles.priceRow}>
        <strong className={styles.price}>{formatCurrency(product.price)}</strong>
        <span className={styles.meta}>{product.stockCount} sản phẩm sẵn kho</span>
      </div>

      <p className={styles.description}>{product.shortDescription}</p>

      <div className={styles.badges}>
        {product.badges.map((badge) => (
          <span key={badge} className={styles.badge}>
            {badge}
          </span>
        ))}
      </div>

      <div className={styles.actions}>
        <Button className={styles.actionButton}>Thêm vào giỏ hàng</Button>
        <Button variant="outline" className={styles.actionButton}>
          Mua ngay
        </Button>
      </div>
    </div>
  );
}

export default ProductInformation;
