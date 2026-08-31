import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { galleryStrip, materialsIntro } from '../aboutData';
import styles from './AboutGalleryStrip.module.css';

function AboutGalleryStrip() {
  const [feature, ...rest] = galleryStrip;

  return (
    <section className={styles.section} aria-label="Một số dược liệu tiêu biểu">
      <div className={`container ${styles.layout}`}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>{materialsIntro.eyebrow}</span>
          <h2 className={styles.title}>{materialsIntro.title}</h2>
          <p className={styles.description}>{materialsIntro.description}</p>

          <Link to="/shop" className={styles.action}>
            {materialsIntro.actionLabel}
            <FiArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {/* Mot anh lon ben trai, cac anh con lai xep thanh luoi ben phai. */}
        <div className={styles.mosaic}>
          {feature ? (
            <img
              src={feature.image}
              alt={feature.alt}
              className={`${styles.image} ${styles.feature}`}
              loading="lazy"
            />
          ) : null}

          {rest.map((item) => (
            <img
              key={item.image}
              src={item.image}
              alt={item.alt}
              className={styles.image}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutGalleryStrip;
