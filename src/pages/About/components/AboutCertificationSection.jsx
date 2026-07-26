import SectionHeader from '../../../components/common/SectionHeader';
import { certifications } from '../aboutData';
import styles from './AboutCertificationSection.module.css';

function AboutCertificationSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow="Chứng nhận"
          title="Những cam kết thể hiện sự nhất quán và tin cậy trong vận hành thương hiệu."
          description="Đây là khu vực placeholder nội dung chứng nhận để sau này có thể thay bằng tài liệu hoặc hình ảnh thực tế mà không cần đổi bố cục."
          align="center"
        />

        <div className={styles.grid}>
          {certifications.map((item) => (
            <article key={item.title} className={styles.card}>
              <div className={styles.icon} aria-hidden="true">
                ✓
              </div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutCertificationSection;
