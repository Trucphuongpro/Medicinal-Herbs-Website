import { FiBox, FiDollarSign, FiGrid, FiShoppingBag, FiUsers } from 'react-icons/fi';
import { DataTable, PageHeader, StatisticCard, StatusBadge } from '../../components/admin';
import {
  dashboardStats,
  lowStockProducts,
  recentOrders,
  topSellingProducts,
} from '../../mocks/adminData';
import { formatCurrency, formatDate } from './utils';
import styles from '../../components/admin/AdminShared.module.css';

const statIcons = {
  products: <FiBox aria-hidden="true" />,
  categories: <FiGrid aria-hidden="true" />,
  orders: <FiShoppingBag aria-hidden="true" />,
  users: <FiUsers aria-hidden="true" />,
  revenue: <FiDollarSign aria-hidden="true" />,
};

function DashboardPage() {
  const recentOrderColumns = [
    { key: 'id', label: 'Mã đơn' },
    { key: 'customer', label: 'Khách hàng' },
    { key: 'date', label: 'Ngày', render: (row) => formatDate(row.date) },
    { key: 'total', label: 'Tổng tiền', render: (row) => formatCurrency(row.total) },
    { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <section className={styles.page}>
      <PageHeader
        title="Dashboard"
        subtitle="Tổng quan hoạt động bán hàng, đơn hàng mới và các nhóm sản phẩm cần theo dõi trong ngày."
        actions={<StatusBadge status="active">Live mock data</StatusBadge>}
      />

      <div className={styles.statsGrid}>
        {dashboardStats.map((item) => (
          <StatisticCard key={item.key} {...item} icon={statIcons[item.key]} />
        ))}
      </div>

      <div className={styles.gridTwo}>
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Recent Orders</h2>
              <p className={styles.sectionDescription}>Các đơn mới nhất cần đội vận hành theo dõi.</p>
            </div>
          </div>
          <DataTable columns={recentOrderColumns} data={recentOrders} />
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Top Selling Products</h2>
              <p className={styles.sectionDescription}>Nhóm sản phẩm đang kéo doanh thu tốt nhất.</p>
            </div>
          </div>
          <div className={styles.stackList}>
            {topSellingProducts.map((item, index) => (
              <div key={item.id} className={styles.stackItem}>
                <div>
                  <p className={styles.itemTitle}>{index + 1}. {item.name}</p>
                  <p className={styles.itemMeta}>{item.sold} sản phẩm đã bán</p>
                </div>
                <strong>{formatCurrency(item.revenue)}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.gridThree}>
        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Low Stock Products</h2>
              <p className={styles.sectionDescription}>Ưu tiên nhập thêm để tránh gián đoạn đơn hàng.</p>
            </div>
          </div>
          <div className={styles.stackList}>
            {lowStockProducts.map((item) => (
              <div key={item.id} className={styles.stackItem}>
                <div>
                  <p className={styles.itemTitle}>{item.name}</p>
                  <p className={styles.itemMeta}>{item.sku}</p>
                </div>
                <StatusBadge status={item.stock === 0 ? 'out_of_stock' : 'pending'}>
                  {item.stock}/{item.threshold}
                </StatusBadge>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.placeholder}>
          <span className={styles.eyebrow}>Placeholder</span>
          <div className={styles.placeholderValue}>Revenue</div>
          <p className={styles.pageSubtitle}>Khu vực dành cho biểu đồ doanh thu theo ngày, tuần và tháng.</p>
        </div>

        <div className={styles.placeholder}>
          <span className={styles.eyebrow}>Placeholder</span>
          <div className={styles.placeholderValue}>Status</div>
          <p className={styles.pageSubtitle}>Khu vực dành cho thống kê trạng thái đơn hàng dạng biểu đồ.</p>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
