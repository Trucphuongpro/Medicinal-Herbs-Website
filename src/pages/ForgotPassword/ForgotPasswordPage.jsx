import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

function ForgotPasswordPage() {
  return (
    <>
      <h1 className="page-title">Quên mật khẩu</h1>
      <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
        Nhập email để nhận liên kết đặt lại mật khẩu.
      </p>
      <Button fullWidth>Gửi yêu cầu</Button>
      <p style={{ marginTop: '1rem', fontSize: 'var(--font-size-sm)', textAlign: 'center' }}>
        <Link to="/login">Quay lại đăng nhập</Link>
      </p>
    </>
  );
}

export default ForgotPasswordPage;
