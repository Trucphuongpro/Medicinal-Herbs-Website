import clsx from 'clsx';
import styles from './AdminShared.module.css';

function ActionButton({ children, tone = 'primary', icon, className, ...props }) {
  const toneClass = {
    primary: styles.actionPrimary,
    secondary: styles.actionSecondary,
    danger: styles.actionDanger,
    ghost: styles.actionGhost,
  }[tone];

  return (
    <button type="button" className={clsx(styles.actionButton, toneClass, className)} {...props}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

export default ActionButton;
