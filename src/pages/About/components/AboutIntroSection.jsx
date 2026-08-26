import SectionHeader from '../../../components/common/SectionHeader';
import { buildIntroStats } from '../aboutData';
import styles from './AboutIntroSection.module.css';

function AboutIntroSection({ productCount = 0, categoryCount = 0 }) {
  const stats = buildIntroStats({ productCount, categoryCount });

  return (
    <section className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.story}>
          <SectionHeader
            eyebrow="Giới thiệu"
            title="Một cửa hàng dược liệu được sắp xếp để ai cũng có thể chọn nhanh và yên tâm hơn."
          />

          <img
            src="/images/products/que-chi.jpg"
            alt="Thanh quế, bột quế và nụ quế khô"
            className={styles.storyImage}
          />
        </div>

        <div className={styles.stats}>
          {stats.map((item) => (
            <article key={item.label} className={styles.statCard}>
              <strong>{item.value}</strong>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutIntroSection;
