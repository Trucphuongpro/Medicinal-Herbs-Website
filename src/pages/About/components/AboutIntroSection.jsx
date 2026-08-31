import { FiFeather, FiMapPin, FiPackage } from 'react-icons/fi';
import { buildIntroStats } from '../aboutData';
import styles from './AboutIntroSection.module.css';

const STAT_ICONS = [FiFeather, FiPackage, FiMapPin];

function AboutIntroSection({ productCount = 0, categoryCount = 0 }) {
  const stats = buildIntroStats({ productCount, categoryCount });

  return (
    <section className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <figure className={styles.visual}>
          <img
            src="/images/products/que-chi.jpg"
            alt="Thanh quế, bột quế và nụ quế khô xếp trên mặt gỗ"
            className={styles.visualImage}
            loading="lazy"
          />
        </figure>

        <div className={styles.content}>
          <span className={styles.eyebrow}>Về chúng tôi</span>
          <h2 className={styles.title}>Dược liệu từ vùng đất Măng Đen.</h2>

          <p className={styles.paragraph}>
            Chúng tôi mang đến những sản phẩm dược liệu được lựa chọn từ vùng nguyên liệu sạch,
            nuôi dưỡng bởi khí hậu mát lành và thiên nhiên thuần khiết của Măng Đen.
          </p>
          <p className={styles.paragraph}>
            Mỗi sản phẩm là kết quả của sự tỉ mỉ trong từng công đoạn, giúp bạn an tâm chăm sóc
            sức khỏe mỗi ngày.
          </p>

          <dl className={styles.stats}>
            {stats.map((item, index) => {
              const Icon = STAT_ICONS[index] ?? FiFeather;

              return (
                <div key={item.label} className={styles.statItem}>
                  <span className={styles.statIcon} aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <dt className={styles.statValue}>{item.value}</dt>
                  <dd className={styles.statLabel}>{item.label}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default AboutIntroSection;
