import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

function RegisterPage() {
  return (
    <>
      <h1 className="page-title">Đăng ký</h1>
      <p style={{ marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
        Tạo tài khoản mới.
      </p>
      <Button fullWidth>Đăng ký</Button>
      <p style={{ marginTop: '1rem', fontSize: 'var(--font-size-sm)', textAlign: 'center' }}>
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </>
  );
}

export default RegisterPage;
