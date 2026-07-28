import { FiSearch } from 'react-icons/fi';
import styles from './AdminShared.module.css';

function SearchBox({ value, onChange, placeholder = 'Tìm kiếm...' }) {
  return (
    <label className={styles.searchBox}>
      <FiSearch className={styles.searchIcon} aria-hidden="true" />
      <input
        type="search"
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default SearchBox;
