import { useEffect, useMemo, useState } from 'react';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import orderService from '../../services/order.service';
import { mapOrderToCard } from '../../utils/apiMappers';
import { OrdersHeader, OrdersList, OrdersTabs } from './components';
import { defaultStatusTab, orderStatusTabs } from './ordersData';
import styles from './OrdersPage.module.css';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(defaultStatusTab);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await orderService.getAll();
      setOrders((response || []).map(mapOrderToCard));
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải danh sách đơn hàng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    if (activeTab === 'all') return orders;
    return orders.filter((order) => order.statusKey === activeTab);
  }, [activeTab, orders]);

  if (loading) {
    return <Loading fullScreen text="Đang tải danh sách đơn hàng..." />;
  }

  if (error && !orders.length) {
    return <ErrorState message={error} onRetry={loadOrders} />;
  }

  return (
    <div className={styles.page}>
      <OrdersHeader totalOrders={orders.length} />
      <OrdersTabs tabs={orderStatusTabs} activeTab={activeTab} onChange={setActiveTab} />
      <OrdersList orders={filteredOrders} activeTab={activeTab} />
    </div>
  );
}

export default OrdersPage;
