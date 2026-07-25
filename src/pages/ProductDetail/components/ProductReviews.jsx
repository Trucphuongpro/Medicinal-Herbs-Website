import Rating from '../../../components/common/Rating';
import { formatDate } from '../../../utils/format';
import styles from './ProductReviews.module.css';

function ProductReviews({ reviews, averageRating }) {
  return (
    <section className={styles.section}>
      <div className={styles.summary}>
        <div>
          <h2 className={styles.title}>Đánh giá khách hàng</h2>
          <p className={styles.subtitle}>Nội dung review là mock data để hoàn thiện giao diện trang chi tiết.</p>
        </div>
        <div className={styles.averageCard}>
          <strong>{averageRating.toFixed(1)}</strong>
          <Rating value={averageRating} />
          <span>{reviews.length} nhận xét gần đây</span>
        </div>
      </div>

      <div className={styles.list}>
        {reviews.map((review) => (
          <article key={review.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <strong>{review.name}</strong>
                <span>{formatDate(review.date)}</span>
              </div>
              <Rating value={review.rating} size={14} />
            </div>
            <p>{review.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProductReviews;
