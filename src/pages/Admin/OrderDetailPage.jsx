import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import { PageHeader, StatusBadge } from '../../components/admin';
import orderService from '../../services/order.service';
import { formatCurrency, formatPaymentMethod, mapOrderStatusToAdmin } from './utils';
import styles from '../../components/admin/AdminShared.module.css';

function OrderDetailPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrderDetail = async () => {
      if (!orderId) {
        setError('Thiếu mã đơn hàng để xem chi tiết.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const response = await orderService.getAdminById(orderId);
        setOrderDetail(response);
      } catch (err) {
        setError(err.response?.data?.message || 'Không thể tải chi tiết đơn hàng admin.');
      } finally {
        setLoading(false);
      }
    };

    loadOrderDetail();
  }, [orderId]);

  if (loading) {
    return <Loading fullScreen text="Đang tải chi tiết đơn hàng..." />;
  }

  if (error || !orderDetail) {
    return <ErrorState message={error || 'Không tìm thấy đơn hàng.'} />;
  }

  const subtotal = (orderDetail.items || []).reduce(
    (sum, item) => sum + Number(item.price ?? 0) * Number(item.quantity ?? 0),
    0,
  );

  return (
    <section className={styles.page}>
      <PageHeader
        title={`Chi tiết đơn hàng ${orderDetail.id}`}
        subtitle="Tổng hợp thông tin đơn hàng trực tiếp từ backend admin."
        actions={<StatusBadge status={mapOrderStatusToAdmin(orderDetail.status)} />}
      />

      <div className={styles.gridTwo}>
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Thông tin khách hàng</h2>
            </div>
          </div>
          <div className={styles.stackList}>
            <div className={styles.stackItem}><span>Khách hàng</span><strong>{orderDetail.user?.fullname || orderDetail.user_id}</strong></div>
            <div className={styles.stackItem}><span>Số điện thoại</span><strong>{orderDetail.phone}</strong></div>
            <div className={styles.stackItem}><span>Email</span><strong>{orderDetail.user?.email || 'Chưa có'}</strong></div>
            <div className={styles.stackItem}><span>Thanh toán</span><strong>{formatPaymentMethod(orderDetail.payment_method)}</strong></div>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Địa chỉ & ghi chú</h2>
            </div>
          </div>
          <p className={styles.pageSubtitle}>{orderDetail.shipping_address}</p>
          <div className={styles.sectionCard}>
            <strong>Trạng thái</strong>
            <p className={styles.pageSubtitle}>{orderDetail.status}</p>
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Danh sách sản phẩm</h2>
          </div>
        </div>
        <div className={styles.stackList}>
          {(orderDetail.items || []).map((item) => (
            <div key={item.id} className={styles.stackItem}>
              <div>
                <p className={styles.itemTitle}>{item.product_id}</p>
                <p className={styles.itemMeta}>SL {item.quantity} x {formatCurrency(Number(item.price ?? 0))}</p>
              </div>
              <strong>{formatCurrency(Number(item.price ?? 0) * Number(item.quantity ?? 0))}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Tổng tiền</h2>
          </div>
        </div>
        <div className={styles.summaryList}>
          <div className={styles.summaryItem}><span>Tạm tính</span><strong>{formatCurrency(subtotal)}</strong></div>
          <div className={styles.summaryItem}><span>Phí vận chuyển</span><strong>{formatCurrency(Math.max(0, Number(orderDetail.total_price ?? 0) - subtotal))}</strong></div>
          <div className={styles.summaryItem}><span>Giảm giá</span><strong>{formatCurrency(0)}</strong></div>
          <div className={styles.summaryItem}><span>Tổng cộng</span><strong>{formatCurrency(Number(orderDetail.total_price ?? 0))}</strong></div>
        </div>
      </div>
    </section>
  );
}

export default OrderDetailPage;
