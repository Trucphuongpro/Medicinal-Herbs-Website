import styles from './AdminShared.module.css';

function FormSelect({ label, options = [], hint, ...props }) {
  return (
    <label className={styles.fieldGroup}>
      <span className={styles.fieldLabel}>{label}</span>
      <select className={styles.filterSelect} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? <span className={styles.fieldHint}>{hint}</span> : null}
    </label>
  );
}

export default FormSelect;
