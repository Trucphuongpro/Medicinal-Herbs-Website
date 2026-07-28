import styles from './AdminShared.module.css';

function FormInput({ label, hint, ...props }) {
  return (
    <label className={styles.fieldGroup}>
      <span className={styles.fieldLabel}>{label}</span>
      <input className={styles.fieldInput} {...props} />
      {hint ? <span className={styles.fieldHint}>{hint}</span> : null}
    </label>
  );
}

export default FormInput;
