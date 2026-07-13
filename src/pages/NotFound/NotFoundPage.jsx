import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

function NotFoundPage() {
  return (
    <section className="page-section">
      <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 className="page-title">404</h1>
        <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>
          Trang bạn tìm kiếm không tồn tại.
        </p>
        <Link to="/">
          <Button>Về trang chủ</Button>
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
