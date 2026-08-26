import { galleryStrip } from '../aboutData';
import styles from './AboutGalleryStrip.module.css';

function AboutGalleryStrip() {
  return (
    <section className={styles.section} aria-label="Một số dược liệu tiêu biểu">
      <div className={styles.strip}>
        {galleryStrip.map((item) => (
          <img key={item.image} src={item.image} alt={item.alt} className={styles.image} />
        ))}
      </div>
    </section>
  );
}

export default AboutGalleryStrip;
