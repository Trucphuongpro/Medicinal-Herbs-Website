import { Link } from 'react-router-dom';
import styles from './PromotionBanner.module.css';

function PromotionBanner() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.banner}>
          <div className={styles.content}>
            <span className={styles.label}>Ưu đãi trong tuần</span>
            <h2 className={styles.title}>Ưu đãi cho set quà thảo mộc thanh lịch và dễ tặng.</h2>
          </div>

          <div className={styles.side}>
            <div className={styles.offerBox}>
              <strong>Giảm đến 15%</strong>
              <span>Áp dụng cho các set quà tinh chọn và đơn hàng từ 2 hộp trở lên.</span>
            </div>
            <Link to="/shop" className={styles.action}>
              Mua ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromotionBanner;
