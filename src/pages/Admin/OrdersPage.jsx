import { useEffect, useState } from 'react';
import { FiArrowRight, FiRefreshCw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import {
  ActionButton,
  DataTable,
  PageHeader,
  StatusBadge,
} from '../../components/admin';
import EmptyState from '../../components/common/EmptyState';
import orderService from '../../services/order.service';
import { formatCurrency, formatDate, mapApiOrderToAdminRow } from './utils';
import styles from '../../components/admin/AdminShared.module.css';

const orderStatusTabs = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Chờ xác nhận' },
  { value: 'processing', label: 'Đang xử lý' },
  { value: 'shipping', label: 'Đang giao' },
  { value: 'completed', label: 'Hoàn thành' },
  { value: 'cancelled', label: 'Đã hủy' },
];
const nextStatusMap = {
  pending: { label: 'Xác nhận đơn', value: 'confirmed' },
  processing: { label: 'Chuyển sang giao', value: 'shipping' },
  shipping: { label: 'Đánh dấu đã giao', value: 'delivered' },
};

function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await orderService.getAll({
        page: 1,
        limit: 50,
      });
      setOrders((response.data || []).map(mapApiOrderToAdminRow));
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải danh sách đơn hàng admin.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => (activeTab === 'all' ? true : order.status === activeTab));

  const handleStatusUpdate = async (order) => {
    const nextStatus = nextStatusMap[order.status];
    if (!nextStatus) return;

    try {
      await orderService.updateStatus(order.id, { status: nextStatus.value });
      await loadOrders();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể cập nhật trạng thái đơn hàng.');
    }
  };

  if (loading) {
    return <Loading fullScreen text="Đang tải đơn hàng admin..." />;
  }

  if (error && !orders.length) {
    return <ErrorState message={error} onRetry={loadOrders} />;
  }

  const columns = [
    { key: 'id', label: 'Mã đơn' },
    { key: 'customer', label: 'Khách hàng' },
    { key: 'date', label: 'Ngày', render: (row) => formatDate(row.date) },
    { key: 'total', label: 'Tổng tiền', render: (row) => formatCurrency(row.total) },
    { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'payment', label: 'Thanh toán' },
    {
      key: 'action',
      label: 'Action',
      render: (row) => (
        <div className={styles.actions}>
          <ActionButton tone="ghost" icon={<FiArrowRight aria-hidden="true" />} onClick={() => navigate(`/admin/orders/detail?id=${row.id}`)}>Xem chi tiết</ActionButton>
          <ActionButton
            tone="secondary"
            icon={<FiRefreshCw aria-hidden="true" />}
            onClick={() => handleStatusUpdate(row)}
            disabled={!nextStatusMap[row.status]}
          >
            {nextStatusMap[row.status]?.label || 'Đã hoàn tất'}
          </ActionButton>
        </div>
      ),
    },
  ];

  return (
    <section className={styles.page}>
      <PageHeader
        title="Quản lý đơn hàng"
        subtitle="Đơn hàng admin đang lấy từ backend, bao gồm xem chi tiết và cập nhật trạng thái theo luồng BE cho phép."
      />

      {error ? <ErrorState message={error} /> : null}

      <div className={styles.sectionCard}>
        <div className={styles.tabs}>
          {orderStatusTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              className={`${styles.tab} ${activeTab === tab.value ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.sectionCard}>
        <DataTable
          columns={columns}
          data={filteredOrders}
          emptyState={
            <EmptyState
              title="Chưa có đơn hàng"
              description="Backend chưa trả về đơn hàng nào cho tài khoản admin hiện tại."
            />
          }
        />
      </div>
    </section>
  );
}

export default OrdersPage;
