import { Link, useLocation } from 'react-router-dom';
import Button from '../Button';
import styles from './LoginPrompt.module.css';

/**
 * Man hinh moi dang nhap dat giua trang, dung cho nhung trang can tai khoan
 * moi xem duoc (gio hang, thanh toan). Khac AuthRequiredDialog o cho no thay
 * the noi dung trang thay vi phu len tren.
 */
function LoginPrompt({
  title = 'Đăng nhập để xem giỏ hàng',
  description = 'Giỏ hàng gắn với tài khoản của bạn, nên cần đăng nhập để xem và đặt hàng.',
}) {
  const location = useLocation();
  const from = { from: location.pathname };

  return (
    <section className={`page-section ${styles.page}`}>
      <div className="container">
        <div className={styles.panel}>
          <span className={styles.icon} aria-hidden="true">
            🌿
          </span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>

          <div className={styles.actions}>
            <Link to="/login" state={from} className={styles.action}>
              <Button fullWidth>Đăng nhập</Button>
            </Link>
            <Link to="/register" state={from} className={styles.action}>
              <Button variant="outline" fullWidth>
                Tạo tài khoản mới
              </Button>
            </Link>
          </div>

          <Link to="/shop" className={styles.back}>
            Quay lại cửa hàng
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LoginPrompt;
