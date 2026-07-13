import { Outlet } from 'react-router-dom';
import ProfileSidebar from '../components/layout/ProfileSidebar';
import styles from './ProfileLayout.module.css';

function ProfileLayout() {
  return (
    <div className={styles.layout}>
      <ProfileSidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;
