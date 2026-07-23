import { Link } from 'react-router-dom';
import heroImage from '../../../assets/hero.png';
import { heroHighlights, heroStats } from '../homeData';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
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
            <img src={heroImage} alt="Bộ sưu tập dược liệu thiên nhiên" className={styles.image} />
          </div>

          <div className={styles.floatingCard}>
            <p className={styles.floatingLabel}>Bộ sưu tập nổi bật</p>
            <strong className={styles.floatingTitle}>Trà thảo mộc và quà biếu sức khỏe</strong>
            <span className={styles.floatingMeta}>Được chọn nhiều cho nhu cầu chăm sóc hằng ngày</span>
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
