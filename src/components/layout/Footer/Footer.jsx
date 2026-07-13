import { Link } from 'react-router-dom';
import { APP_NAME } from '../../../config';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <h3 className={styles.sectionTitle}>{APP_NAME}</h3>
            <p className={styles.text}>
              Chuyên cung cấp dược liệu thiên nhiên chất lượng cao, an toàn và uy tín.
            </p>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>Liên kết</h3>
            <nav className={styles.links} aria-label="Liên kết footer">
              <Link to="/shop" className={styles.link}>Cửa hàng</Link>
              <Link to="/about" className={styles.link}>Giới thiệu</Link>
              <Link to="/contact" className={styles.link}>Liên hệ</Link>
            </nav>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>Hỗ trợ</h3>
            <nav className={styles.links} aria-label="Hỗ trợ">
              <Link to="/orders" className={styles.link}>Đơn hàng</Link>
              <Link to="/profile" className={styles.link}>Tài khoản</Link>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          &copy; {currentYear} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
