import Rating from '../../../components/common/Rating';
import { formatDate } from '../../../utils/format';
import styles from './ProductReviews.module.css';

function ProductReviews({ reviews, averageRating }) {
  return (
    <section className={styles.section}>
      <div className={styles.summary}>
        <div>
          <h2 className={styles.title}>Đánh giá khách hàng</h2>
          <p className={styles.subtitle}>Nhận xét được lấy từ các đơn hàng đã giao thành công trên hệ thống.</p>
        </div>
        <div className={styles.averageCard}>
          <strong>{averageRating.toFixed(1)}</strong>
          <Rating value={averageRating} />
          <span>{reviews.length} nhận xét gần đây</span>
        </div>
      </div>

      {reviews.length ? (
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
      ) : (
        <div className={styles.card}>
          <p>Chưa có đánh giá nào cho sản phẩm này.</p>
        </div>
      )}
    </section>
  );
}

export default ProductReviews;
