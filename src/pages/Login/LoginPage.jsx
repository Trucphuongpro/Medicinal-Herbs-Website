import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

function LoginPage() {
  return (
    <>
      <h1 className="page-title">Đăng nhập</h1>
      <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
        Đăng nhập để tiếp tục mua sắm.
      </p>
      <Button fullWidth>Đăng nhập</Button>
      <p style={{ marginTop: '1rem', fontSize: 'var(--font-size-sm)', textAlign: 'center' }}>
        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </p>
    </>
  );
}

export default LoginPage;
