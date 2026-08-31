import { FiBox, FiFeather, FiSearch } from 'react-icons/fi';
import { certifications } from '../aboutData';
import styles from './AboutCertificationSection.module.css';

const CERT_ICONS = [FiFeather, FiBox, FiSearch];

function AboutCertificationSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.panel}>
          <h2 className={styles.title}>Cam kết của chúng tôi</h2>

          <div className={styles.grid}>
            {certifications.map((item, index) => {
              const Icon = CERT_ICONS[index] ?? FiFeather;

              return (
                <article key={item.title} className={styles.item}>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon size={22} />
                  </span>

                  <div className={styles.itemBody}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemText}>{item.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutCertificationSection;
