import SectionHeader from '../../../components/common/SectionHeader';
import { values } from '../aboutData';
import styles from './AboutValuesSection.module.css';

function AboutValuesSection() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.panel}>
          <SectionHeader
            eyebrow="Giá trị"
            title="Ba giá trị cốt lõi định hình cách thương hiệu xuất hiện và phục vụ."
          />
        </div>

        <div className={styles.cards}>
          {values.map((value) => (
            <article key={value.title} className={`${styles.card} ${styles[value.tone]}`}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutValuesSection;
