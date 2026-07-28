import Button from '../../../components/common/Button';
import shared from './ProfileSection.module.css';
import styles from './LogoutTab.module.css';

function LogoutTab({ userName, onLogout }) {
  return (
    <section className={`${shared.card} ${styles.card}`}>
      <div className={shared.header}>
        <h2 className={shared.title}>Đăng xuất tài khoản</h2>
        <p className={shared.description}>
          Đây là mô phỏng giao diện đăng xuất. Bạn có thể dùng khối này để nối logic xác nhận thật sau này.
        </p>
      </div>

      <div className={styles.confirmBox}>
        <strong>{userName}</strong>
        <p>Bạn có chắc muốn đăng xuất khỏi thiết bị hiện tại không?</p>
      </div>

      <div className={shared.actionRow}>
        <Button variant="danger" onClick={onLogout}>Đăng xuất</Button>
        <Button variant="outline">Ở lại</Button>
      </div>
    </section>
  );
}

export default LogoutTab;
