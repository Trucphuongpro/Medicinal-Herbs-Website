import { PageHeader, StatusBadge } from '../../components/admin';
import { orderDetail } from '../../mocks/adminData';
import { formatCurrency } from './utils';
import styles from '../../components/admin/AdminShared.module.css';

function OrderDetailPage() {
  return (
    <section className={styles.page}>
      <PageHeader
        title={`Chi tiết đơn hàng ${orderDetail.id}`}
        subtitle="Tổng hợp thông tin khách hàng, timeline xử lý, sản phẩm trong đơn và giá trị thanh toán."
        actions={<StatusBadge status={orderDetail.status} />}
      />

      <div className={styles.gridTwo}>
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Thông tin khách hàng</h2>
            </div>
          </div>
          <div className={styles.stackList}>
            <div className={styles.stackItem}><span>Khách hàng</span><strong>{orderDetail.customer.name}</strong></div>
            <div className={styles.stackItem}><span>Số điện thoại</span><strong>{orderDetail.customer.phone}</strong></div>
            <div className={styles.stackItem}><span>Email</span><strong>{orderDetail.customer.email}</strong></div>
            <div className={styles.stackItem}><span>Thanh toán</span><strong>{orderDetail.payment}</strong></div>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Địa chỉ & ghi chú</h2>
            </div>
          </div>
          <p className={styles.pageSubtitle}>{orderDetail.address}</p>
          <div className={styles.sectionCard}>
            <strong>Ghi chú</strong>
            <p className={styles.pageSubtitle}>{orderDetail.note}</p>
          </div>
        </div>
      </div>

      <div className={styles.gridTwo}>
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Danh sách sản phẩm</h2>
            </div>
          </div>
          <div className={styles.stackList}>
            {orderDetail.items.map((item) => (
              <div key={item.id} className={styles.stackItem}>
                <div className={styles.itemMedia}>
                  <img className={styles.itemThumb} src={item.image} alt={item.name} />
                  <div>
                    <p className={styles.itemTitle}>{item.name}</p>
                    <p className={styles.itemMeta}>SL {item.quantity} x {formatCurrency(item.price)}</p>
                  </div>
                </div>
                <strong>{formatCurrency(item.total)}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Timeline trạng thái</h2>
            </div>
          </div>
          <div className={styles.timeline}>
            {orderDetail.timeline.map((item) => (
              <div key={item.title} className={styles.timelineItem}>
                <span
                  className={`${styles.timelineDot} ${
                    item.status === 'completed'
                      ? styles.timelineDotCompleted
                      : item.status === 'current'
                        ? styles.timelineDotCurrent
                        : ''
                  }`}
                />
                <div>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className={styles.itemMeta}>{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Tổng tiền</h2>
          </div>
        </div>
        <div className={styles.summaryList}>
          <div className={styles.summaryItem}><span>Tạm tính</span><strong>{formatCurrency(orderDetail.summary.subtotal)}</strong></div>
          <div className={styles.summaryItem}><span>Phí vận chuyển</span><strong>{formatCurrency(orderDetail.summary.shipping)}</strong></div>
          <div className={styles.summaryItem}><span>Giảm giá</span><strong>{formatCurrency(orderDetail.summary.discount)}</strong></div>
          <div className={styles.summaryItem}><span>Tổng cộng</span><strong>{formatCurrency(orderDetail.summary.total)}</strong></div>
        </div>
      </div>
    </section>
  );
}

export default OrderDetailPage;
