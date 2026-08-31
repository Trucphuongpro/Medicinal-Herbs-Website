import { Link } from 'react-router-dom';
import { heroGallery, heroHighlights, heroStats } from '../homeData';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <span className={styles.ornamentRight} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <span className={styles.badge}>Dược liệu tinh chọn cho nhịp sống hiện đại</span>
          <h1 className={styles.title}>Chăm sóc sức khỏe mỗi ngày bằng thảo mộc dễ dùng và dễ tin.</h1>
          <p className={styles.description}>
            Từ trà thảo mộc, dược liệu bồi bổ đến các set quà chỉn chu, mọi lựa chọn đều được sắp
            xếp để bạn tìm đúng nhu cầu nhanh hơn.
          </p>

          <div className={styles.actions}>
            <Link to="/shop" className={styles.primaryAction}>
              Khám phá cửa hàng
            </Link>
            <Link to="/about" className={styles.secondaryAction}>
              Tìm hiểu câu chuyện thương hiệu
            </Link>
          </div>

          <ul className={styles.highlights}>
            {heroHighlights.map((item) => (
              <li key={item} className={styles.highlightItem}>
                <span className={styles.highlightDot} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual}>
          <div className={styles.imageFrame}>
            <div className={styles.gallery}>
              {heroGallery.map((item, index) => (
                <figure
                  key={item.image}
                  className={index === 0 ? styles.galleryMain : styles.gallerySide}
                >
                  <img src={item.image} alt={item.alt} className={styles.image} loading="eager" />
                </figure>
              ))}
            </div>
          </div>

          <div className={styles.statsCard}>
            {heroStats.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
