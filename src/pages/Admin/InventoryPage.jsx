import { DataTable, PageHeader, StatusBadge } from '../../components/admin';
import { inventory } from '../../mocks/adminData';
import styles from '../../components/admin/AdminShared.module.css';

function InventoryPage() {
  const columns = [
    { key: 'name', label: 'Tên sản phẩm' },
    { key: 'sku', label: 'SKU' },
    { key: 'stock', label: 'Tồn kho' },
    {
      key: 'lowStockAlert',
      label: 'Cảnh báo sắp hết',
      render: (row) => (
        <StatusBadge status={row.stock <= 10 ? 'pending' : 'active'}>
          {row.lowStockAlert}
        </StatusBadge>
      ),
    },
    { key: 'sold', label: 'Đã bán' },
  ];

  return (
    <section className={styles.page}>
      <PageHeader
        title="Quản lý kho"
        subtitle="Bảng tồn kho tập trung với cảnh báo màu cho sản phẩm cần nhập thêm."
      />
      <div className={styles.sectionCard}>
        <DataTable columns={columns} data={inventory} />
      </div>
    </section>
  );
}

export default InventoryPage;
