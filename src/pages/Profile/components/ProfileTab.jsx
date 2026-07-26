import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import styles from './ProfileTab.module.css';
import shared from './ProfileSection.module.css';

function ProfileTab({ summary, formValues, onChange }) {
  return (
    <div className={styles.layout}>
      <section className={shared.card}>
        <div className={shared.header}>
          <h2 className={shared.title}>Hồ sơ cá nhân</h2>
          <p className={shared.description}>
            Cập nhật thông tin cơ bản để việc giao hàng và hỗ trợ thuận tiện hơn.
          </p>
        </div>

        <div className={shared.grid}>
          <Input label="Họ và tên" name="fullName" value={formValues.fullName} onChange={onChange('fullName')} />
          <Input label="Email" name="email" type="email" value={formValues.email} onChange={onChange('email')} />
          <Input label="Số điện thoại" name="phone" value={formValues.phone} onChange={onChange('phone')} />
          <Input label="Ngày sinh" name="birthday" type="date" value={formValues.birthday} onChange={onChange('birthday')} />
        </div>

        <div className={shared.actionRow}>
          <Button>Lưu thay đổi</Button>
          <Button variant="outline">Hủy chỉnh sửa</Button>
        </div>
      </section>

      <section className={shared.card}>
        <div className={shared.header}>
          <h2 className={shared.title}>Tổng quan tài khoản</h2>
          <p className={shared.description}>Một vài thông tin nhanh giúp bạn theo dõi trạng thái tài khoản hiện tại.</p>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={shared.pill}>Đơn hàng</span>
            <strong>{summary.totalOrders}</strong>
            <p>Đơn đã đặt từ khi tham gia</p>
          </div>
          <div className={styles.statCard}>
            <span className={shared.pill}>Địa chỉ mặc định</span>
            <strong>{summary.defaultAddressLabel}</strong>
            <p>Dùng cho phần lớn đơn giao hàng gần đây</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileTab;
