import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import styles from './RegisterPage.module.css';

function RegisterPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.badge}>Tạo tài khoản mới</span>
        <h1 className={styles.title}>Đăng ký để bắt đầu mua sắm</h1>
        <p className={styles.description}>
          Lưu thông tin cá nhân, theo dõi đơn hàng thuận tiện hơn và nhận gợi ý sản phẩm phù hợp.
        </p>
      </div>

      <form className={styles.form}>
        <div className={styles.grid}>
          <Input label="Họ và tên" name="fullName" placeholder="Nguyễn Văn A" />
          <Input label="Số điện thoại" name="phone" type="tel" placeholder="0901234567" />
        </div>

        <Input label="Email" name="email" type="email" placeholder="you@example.com" />

        <div className={styles.grid}>
          <Input label="Mật khẩu" name="password" type="password" placeholder="Tạo mật khẩu" />
          <Input
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu"
          />
        </div>

        <label className={styles.checkbox}>
          <input type="checkbox" name="terms" />
          <span>Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật.</span>
        </label>

        <Button fullWidth className={styles.submitButton}>
          Đăng ký tài khoản
        </Button>
      </form>

      <p className={styles.footerText}>
        Đã có tài khoản?{' '}
        <Link to="/login" className={styles.inlineLink}>
          Đăng nhập ngay
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
