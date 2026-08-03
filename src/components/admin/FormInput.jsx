import styles from './AdminShared.module.css';

function FormInput({ label, hint, error, ...props }) {
  return (
    <label className={styles.fieldGroup}>
      <span className={styles.fieldLabel}>{label}</span>
      <input className={styles.fieldInput} {...props} />
      {error ? <span className={styles.fieldError}>{error}</span> : hint ? <span className={styles.fieldHint}>{hint}</span> : null}
    </label>
  );
}

export default FormInput;
