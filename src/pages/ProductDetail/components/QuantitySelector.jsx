import styles from './QuantitySelector.module.css';

function QuantitySelector({ quantity, stockCount, onDecrease, onIncrease, onChange }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Số lượng</h2>
        <span className={styles.stock}>Tối đa {stockCount} sản phẩm</span>
      </div>

      <div className={styles.control}>
        <button type="button" className={styles.button} onClick={onDecrease} aria-label="Giảm số lượng">
          -
        </button>
        <input
          type="number"
          min="1"
          max={stockCount}
          value={quantity}
          onChange={(event) => onChange(Number(event.target.value))}
          className={styles.input}
        />
        <button type="button" className={styles.button} onClick={onIncrease} aria-label="Tăng số lượng">
          +
        </button>
      </div>
    </div>
  );
}

export default QuantitySelector;
