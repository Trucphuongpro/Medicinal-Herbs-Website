import SectionHeader from '../../../components/common/SectionHeader';
import { aboutPoints } from '../homeData';
import styles from './AboutSection.module.css';

function AboutSection() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.storyPanel}>
          <div className={styles.storyBadge}>Từ vùng nguyên liệu đến bàn trà</div>
          <h3 className={styles.storyTitle}>Một trang Home được thiết kế để vừa dễ chọn, vừa tạo cảm giác an tâm.</h3>
          <p className={styles.storyText}>
            Chúng tôi ưu tiên cách trình bày nhẹ mắt, thông tin rõ ràng và cảm giác gần gũi để
            người dùng lần đầu vẫn nhanh chóng tìm được sản phẩm phù hợp.
          </p>

          <div className={styles.metrics}>
            <div>
              <strong>30+</strong>
              <span>Dòng sản phẩm thảo mộc được chọn lọc</span>
            </div>
            <div>
              <strong>12</strong>
              <span>Danh mục theo nhu cầu sử dụng thực tế</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <SectionHeader
            eyebrow="Vì sao chọn chúng tôi"
            title="Trải nghiệm gọn, chỉn chu và phù hợp với khách hàng hiện đại."
            description="Không cần quá nhiều lớp nội dung, trang chủ tập trung vào những điểm giúp khách chọn nhanh hơn và cảm nhận được chất lượng thương hiệu."
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
