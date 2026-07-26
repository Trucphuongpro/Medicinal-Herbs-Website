import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import shared from './ProfileSection.module.css';

function PasswordTab({ values, onChange }) {
  return (
    <section className={shared.card}>
      <div className={shared.header}>
        <h2 className={shared.title}>Đổi mật khẩu</h2>
        <p className={shared.description}>Tăng độ an toàn cho tài khoản bằng cách cập nhật mật khẩu mới định kỳ.</p>
      </div>

      <div className={shared.grid}>
        <Input
          label="Mật khẩu hiện tại"
          name="currentPassword"
          type="password"
          value={values.currentPassword}
          onChange={onChange('currentPassword')}
          wrapperClassName={shared.full}
        />
        <Input
          label="Mật khẩu mới"
          name="newPassword"
          type="password"
          value={values.newPassword}
          onChange={onChange('newPassword')}
        />
        <Input
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange('confirmPassword')}
        />
      </div>

      <div className={shared.actionRow}>
        <Button>Cập nhật mật khẩu</Button>
        <Button variant="outline">Hủy</Button>
      </div>
    </section>
  );
}

export default PasswordTab;
