import SectionHeader from '../../../components/common/SectionHeader';
import { testimonials } from '../homeData';
import styles from './Testimonials.module.css';

function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow="Khách hàng nói gì"
          title="Phản hồi tích cực từ những người chọn dược liệu cho gia đình."
          description="Các nhận xét được dùng như mock content để hoàn thiện nhịp trình bày và độ tin cậy cho trang chủ."
          align="center"
        />

        <div className={styles.grid}>
          {testimonials.map((item) => (
            <article key={item.id} className={styles.card}>
              <span className={styles.quoteMark} aria-hidden="true">
                “
              </span>
              <p className={styles.quote}>{item.quote}</p>
              <div className={styles.author}>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
