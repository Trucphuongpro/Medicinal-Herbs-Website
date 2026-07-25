import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import styles from './ForgotPasswordPage.module.css';

function ForgotPasswordPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.badge}>Khôi phục tài khoản</span>
        <h1 className={styles.title}>Quên mật khẩu?</h1>
        <p className={styles.description}>
          Nhập email để nhận hướng dẫn đặt lại mật khẩu. Đây chỉ là giao diện mô phỏng, chưa gửi dữ
          liệu ra ngoài.
        </p>
      </div>

      <form className={styles.form}>
        <Input
          label="Email đăng ký"
          name="email"
          type="email"
          placeholder="you@example.com"
          hint="Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu đến email này."
        />

        <Button fullWidth className={styles.submitButton}>
          Gửi yêu cầu
        </Button>
      </form>

      <div className={styles.helpBox}>
        <strong>Bạn đã nhớ lại mật khẩu?</strong>
        <p>Quay lại trang đăng nhập để tiếp tục truy cập tài khoản của mình.</p>
      </div>

      <p className={styles.footerText}>
        <Link to="/login" className={styles.inlineLink}>
          Quay lại đăng nhập
        </Link>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;
