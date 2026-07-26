import { Link } from 'react-router-dom';
import Button from '../../../components/common/Button';
import styles from './OrdersList.module.css';

function OrderCard({ order }) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.label}>Mã đơn</span>
          <strong>{order.id}</strong>
        </div>
        <span className={`${styles.status} ${styles[order.statusKey]}`}>{order.statusLabel}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.infoBlock}>
          <span className={styles.label}>Ngày</span>
          <strong>{order.date}</strong>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.label}>Tổng tiền</span>
          <strong>{order.total}</strong>
        </div>
      </div>

      <p className={styles.details}>{order.details}</p>

      <div className={styles.actions}>
        <Link to={`/orders/${order.id}`}>
          <Button size="sm" variant="outline">
            Xem chi tiết
          </Button>
        </Link>
      </div>
    </article>
  );
}

function OrdersList({ orders, activeTab }) {
  if (!orders.length) {
    return (
      <div className={styles.emptyState}>
        <h2>Chưa có đơn hàng ở mục này</h2>
        <p>Tab hiện tại là {activeTab}. Hãy thử chuyển sang trạng thái khác để xem thêm đơn hàng mock.</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

export default OrdersList;
