import { useMemo, useState } from 'react';
import { OrdersHeader, OrdersList, OrdersTabs } from './components';
import { defaultStatusTab, orderStatusTabs, ordersMockData } from './ordersData';
import styles from './OrdersPage.module.css';

function OrdersPage() {
  const [activeTab, setActiveTab] = useState(defaultStatusTab);

  const filteredOrders = useMemo(() => {
    if (activeTab === 'all') return ordersMockData;
    return ordersMockData.filter((order) => order.statusKey === activeTab);
  }, [activeTab]);

  return (
    <div className={styles.page}>
      <OrdersHeader totalOrders={ordersMockData.length} />
      <OrdersTabs tabs={orderStatusTabs} activeTab={activeTab} onChange={setActiveTab} />
      <OrdersList orders={filteredOrders} activeTab={activeTab} />
    </div>
  );
}

export default OrdersPage;
