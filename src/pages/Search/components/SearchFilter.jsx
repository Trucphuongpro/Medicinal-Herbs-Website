import styles from './SearchFilter.module.css';

function SearchFilter({ options, selectedFilter, onChange }) {
  return (
    <div className={styles.filters}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`${styles.filter} ${selectedFilter === option.value ? styles.active : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SearchFilter;
