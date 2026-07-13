import clsx from 'clsx';
import styles from './Loading.module.css';

function Loading({ text = 'Đang tải...', fullScreen = false }) {
  return (
    <div className={clsx(styles.loading, fullScreen && styles.fullScreen)} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <span className={styles.text}>{text}</span>
    </div>
  );
}

export default Loading;
