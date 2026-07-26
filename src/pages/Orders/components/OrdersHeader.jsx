import styles from './OrdersHeader.module.css';

function OrdersHeader({ totalOrders }) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className="page-title">Đơn hàng của tôi</h1>
        <p className={styles.description}>
          Theo dõi trạng thái đơn hàng, xem nhanh tổng tiền và đi vào chi tiết từng đơn ngay từ một màn hình.
        </p>
      </div>

      <div className={styles.badge}>
        <strong>{totalOrders}</strong>
        <span>Đơn hàng mock đang hiển thị</span>
      </div>
    </div>
  );
}

export default OrdersHeader;
