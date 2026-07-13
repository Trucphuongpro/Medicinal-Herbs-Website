import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

function AuthLayout() {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <div className={styles.card}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
