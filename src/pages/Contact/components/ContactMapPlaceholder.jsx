import styles from './ContactMapPlaceholder.module.css';

function ContactMapPlaceholder() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.mapCard}>
          <div className={styles.header}>
            <h2>Google Map Placeholder</h2>
            <p>Khu vực giữ chỗ cho bản đồ nhúng sau này. Hiện tại chỉ là phần trình bày giao diện.</p>
          </div>

          <div className={styles.mapBox}>
            <div className={styles.marker} aria-hidden="true">
              +
            </div>
            <strong>Dược Liệu</strong>
            <span>28 Nguyễn Thị Minh Khai, Quận 3, Hồ Chí Minh</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMapPlaceholder;
