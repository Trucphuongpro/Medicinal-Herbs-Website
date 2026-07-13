import clsx from 'clsx';
import styles from './Button.module.css';

function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        styles.button,
        styles[variant],
        size !== 'md' && styles[size],
        fullWidth && styles.fullWidth,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
