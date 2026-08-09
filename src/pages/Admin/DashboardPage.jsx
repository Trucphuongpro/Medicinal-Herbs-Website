import { useEffect, useState } from 'react';
import { FiBox, FiDollarSign, FiGrid, FiShoppingBag, FiUsers } from 'react-icons/fi';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import { DataTable, PageHeader, StatisticCard, StatusBadge } from '../../components/admin';
import categoryService from '../../services/category.service';
import orderService from '../../services/order.service';
import productService from '../../services/product.service';
import {
  formatCurrency,
  formatDate,
  mapApiOrderToAdminRow,
  mapApiProductToAdminRow,
} from './utils';
import styles from '../../components/admin/AdminShared.module.css';

const statIcons = {
  products: <FiBox aria-hidden="true" />,
  categories: <FiGrid aria-hidden="true" />,
  orders: <FiShoppingBag aria-hidden="true" />,
  users: <FiUsers aria-hidden="true" />,
  revenue: <FiDollarSign aria-hidden="true" />,
};

function DashboardPage() {
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError('');

        const [productsResponse, categoriesResponse, ordersResponse] = await Promise.all([
          productService.getAll(),
          categoryService.getAll(),
          orderService.getAll({ page: 1, limit: 10 }),
        ]);

        const mappedProducts = productsResponse.map(mapApiProductToAdminRow);
        const mappedOrders = (ordersResponse.data || []).map(mapApiOrderToAdminRow);
        const totalRevenue = mappedOrders.reduce((sum, item) => sum + item.total, 0);

        setStats([
          { key: 'products', label: 'Tổng sản phẩm', value: String(mappedProducts.length), change: 'Dữ liệu thật từ backend', tone: 'primary' },
          { key: 'categories', label: 'Tổng danh mục', value: String(categoriesResponse.length), change: 'Dữ liệu thật từ backend', tone: 'info' },
          { key: 'orders', label: 'Tổng đơn hàng', value: String(ordersResponse.total || mappedOrders.length), change: 'Trang hiện tại của admin orders', tone: 'warning' },
          { key: 'users', label: 'Người dùng', value: 'Chưa có API', change: 'Backend chưa có endpoint admin users', tone: 'success' },
          { key: 'revenue', label: 'Doanh thu', value: formatCurrency(totalRevenue), change: 'Tính từ các đơn admin vừa tải', tone: 'danger' },
        ]);
        setRecentOrders(mappedOrders.slice(0, 5));
        setTopProducts(
          [...mappedProducts]
            .sort((a, b) => b.price - a.price)
            .slice(0, 4)
            .map((item) => ({
              id: item.id,
              name: item.name,
              sold: item.stock,
              revenue: item.price,
            })),
        );
        setLowStockProducts(
          mappedProducts
            .filter((item) => item.stock <= 10)
            .slice(0, 5)
            .map((item) => ({
              id: item.id,
              name: item.name,
              sku: item.sku,
              stock: item.stock,
              threshold: 10,
            })),
        );
      } catch (err) {
        setError(err.response?.data?.message || 'Không thể tải dashboard admin.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <Loading fullScreen text="Đang tải dashboard..." />;
  }

  if (error && !stats.length) {
    return <ErrorState message={error} />;
  }

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
        actions={<StatusBadge status="active">Live API data</StatusBadge>}
      />

      {error ? <ErrorState message={error} /> : null}

      <div className={styles.statsGrid}>
        {stats.map((item) => (
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
            {topProducts.map((item, index) => (
              <div key={item.id} className={styles.stackItem}>
                <div>
                  <p className={styles.itemTitle}>{index + 1}. {item.name}</p>
                  <p className={styles.itemMeta}>Giá trị tham chiếu: {item.sold} tồn kho</p>
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
          <span className={styles.eyebrow}>Backend Gap</span>
          <div className={styles.placeholderValue}>Users</div>
          <p className={styles.pageSubtitle}>Backend hiện chưa có API admin users nên ô này đang được giữ ở trạng thái thông báo.</p>
        </div>

        <div className={styles.placeholder}>
          <span className={styles.eyebrow}>Live Snapshot</span>
          <div className={styles.placeholderValue}>{recentOrders.length}</div>
          <p className={styles.pageSubtitle}>Số đơn vừa lấy về để hiển thị nhanh trên dashboard trong lần tải này.</p>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
