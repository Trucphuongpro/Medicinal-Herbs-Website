import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { formatCurrency } from '../../../utils/format';
import styles from './CartProductList.module.css';

function CartQuantityControl({ item, onQuantityChange, disabled }) {
  return (
    <div className={styles.quantityControl}>
      <button
        type="button"
        className={styles.quantityButton}
        onClick={() => onQuantityChange(item.id, item.quantity - 1)}
        disabled={disabled}
        aria-label={`Giảm số lượng ${item.name}`}
      >
        -
      </button>
      <input
        type="number"
        min="1"
        max={item.maxQuantity}
        value={item.quantity}
        className={styles.quantityInput}
        onChange={(event) => onQuantityChange(item.id, Number(event.target.value))}
        disabled={disabled}
      />
      <button
        type="button"
        className={styles.quantityButton}
        onClick={() => onQuantityChange(item.id, item.quantity + 1)}
        disabled={disabled}
        aria-label={`Tăng số lượng ${item.name}`}
      >
        +
      </button>
    </div>
  );
}

function CartItem({ item, onQuantityChange, onRemove, disabled }) {
  return (
    <article className={styles.item}>
      <Link to={`/product/${item.productId || item.id}`} className={styles.imageWrap}>
        <img src={item.image} alt={item.name} className={styles.image} />
      </Link>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{item.category}</span>
          <Link to={`/product/${item.productId || item.id}`} className={styles.nameLink}>
            <h2 className={styles.name}>{item.name}</h2>
          </Link>
          <p className={styles.note}>{item.note}</p>
        </div>

        <div className={styles.actions}>
          <CartQuantityControl item={item} onQuantityChange={onQuantityChange} disabled={disabled} />
          <div className={styles.priceGroup}>
            <strong>{formatCurrency(item.price)}</strong>
            <span>Tạm tính {formatCurrency(item.price * item.quantity)}</span>
          </div>
          <button
            type="button"
            className={styles.removeButton}
            onClick={() => onRemove(item.id)}
            disabled={disabled}
          >
            <FiTrash2 size={16} />
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

function CartProductList({ items, onQuantityChange, onRemove, updatingId }) {
  if (!items.length) {
    return (
      <div className={styles.emptyState}>
        <h2>Giỏ hàng đang trống</h2>
        <p>Hãy thêm vài sản phẩm dược liệu để tiếp tục trải nghiệm mua sắm.</p>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Danh sách sản phẩm</h2>
        <span>{items.length} mục đã chọn</span>
      </div>

      <div className={styles.list}>
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
            disabled={updatingId === item.id}
          />
        ))}
      </div>
    </section>
  );
}

export default CartProductList;
