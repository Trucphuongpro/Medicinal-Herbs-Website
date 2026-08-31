import { FiHeart, FiShield, FiFilter } from 'react-icons/fi';
import { values } from '../aboutData';
import styles from './AboutValuesSection.module.css';

const VALUE_ICONS = { green: FiShield, amber: FiFilter, clay: FiHeart };

function AboutValuesSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.leaf} aria-hidden="true">
            🌿
          </span>
          <h2 className={styles.title}>Ba giá trị cốt lõi</h2>
        </header>

        <div className={styles.grid}>
          {values.map((value) => {
            const Icon = VALUE_ICONS[value.tone] ?? FiShield;

            return (
              <article key={value.title} className={styles.item}>
                <div className={styles.markRow}>
                  <span className={styles.index} aria-hidden="true">
                    {value.index}
                  </span>
                  <span className={`${styles.icon} ${styles[value.tone]}`} aria-hidden="true">
                    <Icon size={22} />
                  </span>
                </div>

                <h3 className={styles.itemTitle}>{value.title}</h3>
                <p className={styles.itemText}>{value.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutValuesSection;
