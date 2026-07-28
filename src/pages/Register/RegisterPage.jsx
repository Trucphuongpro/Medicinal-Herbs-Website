import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import authService from '../../services/auth.service';
import styles from './RegisterPage.module.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
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

    if (formValues.password !== formValues.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (!agreeTerms) {
      setError('Bạn cần đồng ý điều khoản trước khi đăng ký.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await authService.register({
        fullname: formValues.fullName,
        email: formValues.email,
        password: formValues.password,
      });

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.badge}>Tạo tài khoản mới</span>
        <h1 className={styles.title}>Đăng ký để bắt đầu mua sắm</h1>
        <p className={styles.description}>
          Lưu thông tin cá nhân, theo dõi đơn hàng thuận tiện hơn và nhận gợi ý sản phẩm phù hợp.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <Input
            label="Họ và tên"
            name="fullName"
            placeholder="Nguyễn Văn A"
            value={formValues.fullName}
            onChange={handleChange('fullName')}
          />
          <Input
            label="Số điện thoại"
            name="phone"
            type="tel"
            placeholder="0901234567"
            value={formValues.phone}
            onChange={handleChange('phone')}
          />
        </div>

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formValues.email}
          onChange={handleChange('email')}
        />

        <div className={styles.grid}>
          <Input
            label="Mật khẩu"
            name="password"
            type="password"
            placeholder="Tạo mật khẩu"
            value={formValues.password}
            onChange={handleChange('password')}
          />
          <Input
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={formValues.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />
        </div>
        {error ? <p className={styles.description}>{error}</p> : null}

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            name="terms"
            checked={agreeTerms}
            onChange={(event) => setAgreeTerms(event.target.checked)}
          />
          <span>Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật.</span>
        </label>

        <Button fullWidth className={styles.submitButton} type="submit" disabled={loading}>
          {loading ? 'Đang đăng ký...' : 'Đăng ký tài khoản'}
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
