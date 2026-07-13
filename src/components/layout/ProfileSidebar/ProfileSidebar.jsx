import { NavLink } from 'react-router-dom';
import styles from './ProfileSidebar.module.css';

const menuItems = [
  { to: '/profile', label: 'Thông tin cá nhân', end: true },
  { to: '/orders', label: 'Đơn hàng của tôi' },
];

function ProfileSidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav} aria-label="Menu tài khoản">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default ProfileSidebar;
