import SectionHeader from '../../../components/common/SectionHeader';
import { introStats } from '../aboutData';
import styles from './AboutIntroSection.module.css';

function AboutIntroSection() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.story}>
          <SectionHeader
            eyebrow="Giới thiệu"
            title="Một cửa hàng dược liệu được sắp xếp để ai cũng có thể chọn nhanh và yên tâm hơn."
            description="Chúng tôi ưu tiên cách trình bày gọn gàng, danh mục dễ hiểu và cảm giác thương hiệu thiên về sự chỉn chu thay vì phô trương."
          />
        </div>

        <div className={styles.stats}>
          {introStats.map((item) => (
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
