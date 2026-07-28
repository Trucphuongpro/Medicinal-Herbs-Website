import styles from './AdminShared.module.css';

function FormTextarea({ label, hint, ...props }) {
  return (
    <label className={styles.fieldGroup}>
      <span className={styles.fieldLabel}>{label}</span>
      <textarea className={styles.fieldTextarea} {...props} />
      {hint ? <span className={styles.fieldHint}>{hint}</span> : null}
    </label>
  );
}

export default FormTextarea;
