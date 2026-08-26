import { useEffect, useState } from 'react';
import SectionHeader from '../../../components/common/SectionHeader';
import reviewService from '../../../services/review.service';
import styles from './Testimonials.module.css';

function Testimonials() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    let active = true;

    reviewService
      .getFeatured()
      .then((data) => {
        if (active) setReviews(Array.isArray(data) ? data.slice(0, 3) : []);
      })
      .catch(() => {
        // Khong co danh gia thi an luon muc nay, khong hien noi dung thay the.
        if (active) setReviews([]);
      });

    return () => {
      active = false;
    };
  }, []);

  if (!reviews.length) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow="Khách hàng nói gì"
          title="Phản hồi từ người đã mua."
          align="center"
        />

        <div className={styles.grid}>
          {reviews.map((review) => (
            <article key={review.id} className={styles.card}>
              <span className={styles.quoteMark} aria-hidden="true">
                “
              </span>
              <p className={styles.quote}>{review.comment}</p>
              <div className={styles.author}>
                <strong>{review.user?.fullname ?? 'Khách hàng'}</strong>
                <span>{review.product?.name}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
