import { NavLink, Outlet } from 'react-router-dom';
import styles from './AdminPreviewLayout.module.css';

const adminLinks = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/products', label: 'Sản phẩm' },
  { to: '/admin/products/create', label: 'Thêm sản phẩm' },
  { to: '/admin/products/edit', label: 'Sửa sản phẩm' },
  { to: '/admin/categories', label: 'Danh mục' },
  { to: '/admin/orders', label: 'Đơn hàng' },
  { to: '/admin/orders/detail', label: 'Chi tiết đơn' },
  { to: '/admin/users', label: 'Người dùng' },
  { to: '/admin/reviews', label: 'Đánh giá' },
  { to: '/admin/coupons', label: 'Mã giảm giá' },
  { to: '/admin/inventory', label: 'Kho' },
  { to: '/admin/reports', label: 'Báo cáo' },
  { to: '/admin/settings', label: 'Cài đặt' },
];

function AdminPreviewLayout() {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <p className={styles.brandLabel}>Admin Preview</p>
          <h2 className={styles.brandTitle}>Website Dược Liệu</h2>
          <p className={styles.brandText}>Layout tạm để bạn xem nhanh toàn bộ giao diện admin vừa triển khai.</p>
        </div>

        <nav className={styles.nav} aria-label="Admin navigation">
          {adminLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className={styles.content}>
        <header className={styles.header}>
          <div>
            <p className={styles.headerLabel}>Preview Mode</p>
            <h1 className={styles.headerTitle}>Admin Pages</h1>
          </div>
          <a className={styles.headerAction} href="/">
            Về storefront
          </a>
        </header>

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminPreviewLayout;
