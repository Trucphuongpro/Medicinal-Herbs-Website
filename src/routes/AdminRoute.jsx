import { Link, Outlet, useLocation } from 'react-router-dom';
import Button from '../components/common/Button';
import { canAccessAdmin, enableAdminPreview, isAuthenticated } from '../utils/token';
import styles from './AdminRoute.module.css';

function AdminRoute() {
  const location = useLocation();

  if (canAccessAdmin()) {
    return <Outlet />;
  }

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Admin Access</p>
        <h1 className={styles.title}>Bạn chưa có quyền admin trong frontend hiện tại</h1>
        <p className={styles.description}>
          Mình đã thêm chế độ xem thử để bạn mở được toàn bộ page admin dù backend hoặc tài khoản admin thật
          chưa sẵn sàng. Nếu bạn đã có tài khoản admin thật, hãy đăng nhập rồi quay lại trang này.
        </p>
        <div className={styles.actions}>
          {!isAuthenticated() ? (
            <Link to="/login" state={{ from: location.pathname }}>
              <Button>Đăng nhập</Button>
            </Link>
          ) : null}
          <Button
            variant="outline"
            onClick={() => {
              enableAdminPreview();
              window.location.reload();
            }}
          >
            Bật preview admin
          </Button>
        </div>
      </div>
    </section>
  );
}

export default AdminRoute;
