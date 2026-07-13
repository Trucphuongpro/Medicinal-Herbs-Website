import { Link } from 'react-router-dom';
import Rating from '../../common/Rating';
import { formatCurrency } from '../../../utils/format';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  const { id, name, image, price, category, rating = 0 } = product;

  return (
    <article className={styles.card}>
      <Link to={`/product/${id}`} className={styles.imageWrapper}>
        <img
          src={image || '/placeholder-product.png'}
          alt={name}
          className={styles.image}
          loading="lazy"
        />
      </Link>
      <div className={styles.content}>
        {category && <span className={styles.category}>{category}</span>}
        <Link to={`/product/${id}`}>
          <h3 className={styles.name}>{name}</h3>
        </Link>
        <Rating value={rating} size={14} />
        <div className={styles.footer}>
          <span className={styles.price}>{formatCurrency(price)}</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
