import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import authService from '../../services/auth.service';
import { isAdminUser, setAccessToken, setStoredUser } from '../../utils/token';
import styles from './LoginPage.module.css';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Trang truoc do khach dang xem, de dang nhap xong dua ho quay lai dung cho.
  const redirectTo = location.state?.from || searchParams.get('from') || '';
  const sessionExpired = searchParams.get('expired') === '1';

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (event) => {
    setFormValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError('');

      const loginResponse = await authService.login(formValues);
      setAccessToken(loginResponse.accessToken);

      const currentUser = await authService.getMe();
      setStoredUser(currentUser);

      // Uu tien dua khach ve trang ho dang xem truoc do. Khong co thi admin
      // vao khu quan tri, tai khoan thuong ve trang chu.
      if (redirectTo && redirectTo !== '/login') {
        navigate(redirectTo, { replace: true });
      } else {
        navigate(isAdminUser() ? '/admin' : '/', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.badge}>Chào mừng trở lại</span>
        <h1 className={styles.title}>Đăng nhập tài khoản</h1>
        <p className={styles.description}>
          Tiếp tục mua sắm, theo dõi đơn hàng và lưu lại các sản phẩm dược liệu bạn quan tâm.
        </p>
      </div>

      {sessionExpired ? (
        <p className={styles.notice} role="status">
          Phiên đăng nhập đã hết hạn. Bạn đăng nhập lại để tiếp tục nhé.
        </p>
      ) : null}

      {redirectTo && !sessionExpired ? (
        <p className={styles.notice} role="status">
          Đăng nhập xong bạn sẽ được đưa về đúng trang đang xem.
        </p>
      ) : null}

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formValues.email}
          onChange={handleChange('email')}
        />
        <Input
          label="Mật khẩu"
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
          value={formValues.password}
          onChange={handleChange('password')}
        />
        {error ? <p className={styles.description}>{error}</p> : null}

        <div className={styles.utilityRow}>
          <label className={styles.checkbox}>
            <input type="checkbox" name="remember" />
            <span>Ghi nhớ đăng nhập</span>
          </label>

          <Link to="/forgot-password" className={styles.inlineLink}>
            Quên mật khẩu?
          </Link>
        </div>

        <Button fullWidth className={styles.submitButton} type="submit" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
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
