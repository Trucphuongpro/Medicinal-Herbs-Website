import { Link, useLocation } from 'react-router-dom';
import { profileTabs } from '../../../pages/Profile/profileData';
import styles from './ProfileSidebar.module.css';

function ProfileSidebar() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get('tab') || 'profile';

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileCard}>
        <strong>Tài khoản</strong>
        <span>Quản lý hồ sơ, địa chỉ và đơn hàng của bạn.</span>
      </div>

      <nav className={styles.nav} aria-label="Menu tài khoản">
        {profileTabs.map((item) => (
          <Link
            key={item.key}
            to={`/profile?tab=${item.key}`}
            className={`${styles.navLink} ${currentTab === item.key ? styles.navLinkActive : ''}`}
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default ProfileSidebar;
