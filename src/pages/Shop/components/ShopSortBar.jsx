import { sortOptions } from '../shopData';
import styles from './ShopSortBar.module.css';

function ShopSortBar({ totalProducts, sortBy, onSortChange }) {
  return (
    <div className={styles.bar}>
      <div className={styles.summary}>
        <strong>{totalProducts}</strong>
        <span>sản phẩm phù hợp</span>
      </div>

      <label className={styles.sortControl}>
        <span>Sắp xếp</span>
        <select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default ShopSortBar;
