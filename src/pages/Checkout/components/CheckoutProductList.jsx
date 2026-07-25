import { formatCurrency } from '../../../utils/format';
import styles from './CheckoutProductList.module.css';

function CheckoutProductList({ products }) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Product List</h2>
        <span>{products.length} sản phẩm</span>
      </div>

      <div className={styles.list}>
        {products.map((product) => (
          <article key={product.id} className={styles.item}>
            <div className={styles.imageWrap}>
              <img src={product.image} alt={product.name} className={styles.image} />
            </div>
            <div className={styles.meta}>
              <span className={styles.category}>{product.category}</span>
              <h3 className={styles.name}>{product.name}</h3>
              <div className={styles.row}>
                <span>x{product.quantity}</span>
                <strong>{formatCurrency(product.price * product.quantity)}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CheckoutProductList;
