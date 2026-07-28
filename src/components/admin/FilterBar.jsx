import styles from './AdminShared.module.css';

function FilterBar({ start, end }) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarStart}>{start}</div>
      <div className={styles.toolbarEnd}>{end}</div>
    </div>
  );
}

export default FilterBar;
