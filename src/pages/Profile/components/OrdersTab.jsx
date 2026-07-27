import Button from '../../../components/common/Button';
import EmptyState from '../../../components/common/EmptyState';
import shared from './ProfileSection.module.css';
import styles from './OrdersTab.module.css';

function OrdersTab({ orders }) {
  return (
    <section className={shared.card}>
      <div className={shared.header}>
        <h2 className={shared.title}>Đơn hàng gần đây</h2>
        <p className={shared.description}>Theo dõi trạng thái đơn và xem nhanh tổng giá trị từng đơn đã đặt.</p>
      </div>

      {orders.length ? (
        <div className={styles.list}>
          {orders.map((order) => (
            <article key={order.id} className={styles.item}>
              <div className={styles.meta}>
                <strong>{order.id}</strong>
                <span>{order.date}</span>
              </div>
              <div className={styles.info}>
                <span>{order.details}</span>
                <span className={styles.status}>{order.statusLabel}</span>
                <strong>{order.total}</strong>
              </div>
              <Button size="sm" variant="outline">
                Xem chi tiết
              </Button>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Chưa có đơn hàng"
          description="Các đơn đã đặt sẽ xuất hiện tại đây sau khi backend trả dữ liệu."
        />
      )}
    </section>
  );
}

export default OrdersTab;
