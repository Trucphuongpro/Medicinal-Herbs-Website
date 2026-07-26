import { profileTabs } from '../profileData';
import styles from './ProfileHeader.module.css';

function ProfileHeader({ user, activeTab }) {
  const activeLabel = profileTabs.find((tab) => tab.key === activeTab)?.label || 'Hồ sơ';

  return (
    <div className={styles.header}>
      <div className={styles.identity}>
        <div className={styles.avatar} aria-hidden="true">
          {user.fullName
            .split(' ')
            .slice(-2)
            .map((part) => part[0])
            .join('')}
        </div>
        <div>
          <h1 className="page-title">Tài khoản của tôi</h1>
          <p className={styles.description}>
            Quản lý hồ sơ, địa chỉ, đơn hàng và các thiết lập tài khoản trong một nơi duy nhất.
          </p>
        </div>
      </div>

      <div className={styles.badge}>
        <strong>{activeLabel}</strong>
        <span>Thành viên từ {user.memberSince}</span>
      </div>
    </div>
  );
}

export default ProfileHeader;
