import styles from './AdminShared.module.css';

function FormTextarea({ label, hint, error, ...props }) {
  return (
    <label className={styles.fieldGroup}>
      <span className={styles.fieldLabel}>{label}</span>
      <textarea className={styles.fieldTextarea} {...props} />
      {error ? <span className={styles.fieldError}>{error}</span> : hint ? <span className={styles.fieldHint}>{hint}</span> : null}
    </label>
  );
}

export default FormTextarea;
