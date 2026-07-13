import clsx from 'clsx';
import { FiStar } from 'react-icons/fi';
import styles from './Rating.module.css';

function Rating({ value = 0, max = 5, size = 16, showCount = false, count = 0 }) {
  const stars = Array.from({ length: max }, (_, index) => index + 1);

  return (
    <div className={styles.rating} aria-label={`Đánh giá ${value} trên ${max}`}>
      {stars.map((star) => (
        <FiStar
          key={star}
          size={size}
          className={clsx(styles.star, star <= Math.round(value) && styles.filled)}
          aria-hidden="true"
        />
      ))}
      {showCount && count > 0 && (
        <span className={styles.count}>({count})</span>
      )}
    </div>
  );
}

export default Rating;
