import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { closingCta } from '../aboutData';
import styles from './AboutClosingCta.module.css';

function AboutClosingCta() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <figure className={styles.visual}>
          <img src={closingCta.image} alt={closingCta.alt} className={styles.image} loading="lazy" />
        </figure>

        <div className={styles.content}>
          <h2 className={styles.title}>{closingCta.title}</h2>
          <p className={styles.description}>{closingCta.description}</p>
        </div>

        <Link to="/shop" className={styles.action}>
          {closingCta.actionLabel}
          <FiArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default AboutClosingCta;
