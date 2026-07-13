import { FiAlertCircle } from 'react-icons/fi';
import Button from '../Button';
import styles from './ErrorState.module.css';

function ErrorState({
  title = 'Đã xảy ra lỗi',
  message = 'Vui lòng thử lại sau.',
  onRetry,
}) {
  return (
    <div className={styles.error} role="alert">
      <FiAlertCircle className={styles.icon} size={48} aria-hidden="true" />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <div className={styles.action}>
          <Button variant="outline" onClick={onRetry}>
            Thử lại
          </Button>
        </div>
      )}
    </div>
  );
}

export default ErrorState;
