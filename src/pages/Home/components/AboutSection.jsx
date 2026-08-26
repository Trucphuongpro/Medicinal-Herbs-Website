import SectionHeader from '../../../components/common/SectionHeader';
import { aboutPoints } from '../homeData';
import styles from './AboutSection.module.css';

function AboutSection({ productCount = 0, categoryCount = 0 }) {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.storyPanel}>
          <div className={styles.storyBadge}>Từ vùng nguyên liệu đến bàn trà</div>
          <h3 className={styles.storyTitle}>Dược liệu chọn theo mùa, sơ chế đúng cách và ghi rõ nguồn gốc.</h3>
          <p className={styles.storyText}>
            Mỗi lô hàng đều được kiểm tra độ ẩm, màu sắc và mùi trước khi đóng gói. Trên bao bì
            luôn ghi rõ vùng trồng, cách dùng và hạn sử dụng.
          </p>

          <div className={styles.metrics}>
            <div>
              <strong>{productCount}</strong>
              <span>Sản phẩm đang bán</span>
            </div>
            <div>
              <strong>{categoryCount}</strong>
              <span>Danh mục theo nhu cầu sử dụng</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <SectionHeader
            eyebrow="Vì sao chọn chúng tôi"
            title="Vì sao khách chọn mua ở đây."
          />

          <div className={styles.points}>
            {aboutPoints.map((point) => (
              <article key={point.title} className={styles.pointCard}>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
