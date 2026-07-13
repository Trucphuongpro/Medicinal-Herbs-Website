import clsx from 'clsx';
import styles from './Input.module.css';

function Input({
  label,
  id,
  name,
  type = 'text',
  error,
  hint,
  className,
  wrapperClassName,
  ...props
}) {
  const inputId = id || name;

  return (
    <div className={clsx(styles.wrapper, wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        className={clsx(styles.input, error && styles.inputError, className)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
      {!error && hint && (
        <span id={`${inputId}-hint`} className={styles.hint}>
          {hint}
        </span>
      )}
    </div>
  );
}

export default Input;
