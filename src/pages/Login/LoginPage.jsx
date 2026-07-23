import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import styles from './LoginPage.module.css';

function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.badge}>Chào mừng trở lại</span>
        <h1 className={styles.title}>Đăng nhập tài khoản</h1>
        <p className={styles.description}>
          Tiếp tục mua sắm, theo dõi đơn hàng và lưu lại các sản phẩm dược liệu bạn quan tâm.
        </p>
      </div>

      <form className={styles.form}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          hint="Giao diện demo, chưa kết nối API."
        />
        <Input
          label="Mật khẩu"
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
        />

        <div className={styles.utilityRow}>
          <label className={styles.checkbox}>
            <input type="checkbox" name="remember" />
            <span>Ghi nhớ đăng nhập</span>
          </label>

          <Link to="/forgot-password" className={styles.inlineLink}>
            Quên mật khẩu?
          </Link>
        </div>

        <Button fullWidth className={styles.submitButton}>
          Đăng nhập
        </Button>
      </form>

      <p className={styles.footerText}>
        Chưa có tài khoản?{' '}
        <Link to="/register" className={styles.inlineLink}>
          Tạo tài khoản mới
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
