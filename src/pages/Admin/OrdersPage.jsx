import { useState } from 'react';
import { FiArrowRight, FiRefreshCw } from 'react-icons/fi';
import {
  ActionButton,
  DataTable,
  PageHeader,
  StatusBadge,
} from '../../components/admin';
import { orderStatusTabs, orders } from '../../mocks/adminData';
import { formatCurrency, formatDate } from './utils';
import styles from '../../components/admin/AdminShared.module.css';

function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = orders.filter((order) => (activeTab === 'all' ? true : order.status === activeTab));

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
      render: () => (
        <div className={styles.actions}>
          <ActionButton tone="ghost" icon={<FiArrowRight aria-hidden="true" />}>Xem chi tiết</ActionButton>
          <ActionButton tone="secondary" icon={<FiRefreshCw aria-hidden="true" />}>Cập nhật trạng thái</ActionButton>
        </div>
      ),
    },
  ];

  return (
    <section className={styles.page}>
      <PageHeader
        title="Quản lý đơn hàng"
        subtitle="Theo dõi đơn hàng theo từng trạng thái và hỗ trợ đội vận hành xử lý các bước tiếp theo."
      />

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
        <DataTable columns={columns} data={filteredOrders} />
      </div>
    </section>
  );
}

export default OrdersPage;
