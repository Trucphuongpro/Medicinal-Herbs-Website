import Button from '../../../components/common/Button';
import shared from './ProfileSection.module.css';
import styles from './AddressTab.module.css';

function AddressTab({ addresses }) {
  return (
    <section className={shared.card}>
      <div className={shared.header}>
        <h2 className={shared.title}>Sổ địa chỉ</h2>
        <p className={shared.description}>Quản lý các địa chỉ giao hàng thường dùng cho gia đình và công việc.</p>
      </div>

      <div className={styles.grid}>
        {addresses.map((address) => (
          <article key={address.id} className={styles.card}>
            <div className={styles.topRow}>
              <span className={shared.pill}>{address.label}</span>
              {address.isDefault ? <span className={styles.defaultTag}>Mặc định</span> : null}
            </div>
            <strong className={styles.name}>{address.receiver}</strong>
            <span className={styles.phone}>{address.phone}</span>
            <p className={styles.address}>{address.address}</p>
            <div className={shared.actionRow}>
              <Button size="sm">Chỉnh sửa</Button>
              <Button size="sm" variant="outline">
                Xóa
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AddressTab;
