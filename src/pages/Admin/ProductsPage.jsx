import { useState } from 'react';
import { FiEye, FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import Pagination from '../../components/common/Pagination';
import {
  ActionButton,
  ConfirmDialog,
  DataTable,
  FilterBar,
  PageHeader,
  SearchBox,
  StatusBadge,
} from '../../components/admin';
import {
  productCategories,
  products,
  productStatuses,
  sortOptions,
} from '../../mocks/adminData';
import { formatCurrency, formatDate } from './utils';
import styles from '../../components/admin/AdminShared.module.css';

const PAGE_SIZE = 5;

function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((product) => (category === 'all' ? true : product.category === category))
    .filter((product) => (status === 'all' ? true : product.status === status))
    .sort((a, b) => {
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'stock_asc') return a.stock - b.stock;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const pageItems = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const columns = [
    {
      key: 'name',
      label: 'Ảnh / Tên',
      render: (row) => (
        <div className={styles.itemMedia}>
          <img src={row.image} alt={row.name} className={styles.itemThumb} />
          <div>
            <p className={styles.itemTitle}>{row.name}</p>
            <p className={styles.itemMeta}>{row.id}</p>
          </div>
        </div>
      ),
    },
    { key: 'sku', label: 'SKU' },
    { key: 'categoryLabel', label: 'Danh mục' },
    { key: 'price', label: 'Giá', render: (row) => formatCurrency(row.price) },
    { key: 'stock', label: 'Số lượng' },
    { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'createdAt', label: 'Ngày tạo', render: (row) => formatDate(row.createdAt) },
    {
      key: 'actions',
      label: 'Action',
      render: (row) => (
        <div className={styles.actions}>
          <ActionButton tone="ghost" icon={<FiEye aria-hidden="true" />}>Xem</ActionButton>
          <ActionButton tone="secondary" icon={<FiEdit2 aria-hidden="true" />}>Sửa</ActionButton>
          <ActionButton tone="danger" icon={<FiTrash2 aria-hidden="true" />} onClick={() => setSelectedProduct(row)}>
            Xóa
          </ActionButton>
        </div>
      ),
    },
  ];

  return (
    <section className={styles.page}>
      <PageHeader
        title="Quản lý sản phẩm"
        subtitle="Danh sách sản phẩm với tìm kiếm, filter, sort và các action quản trị thường dùng."
        actions={<Button><FiPlus aria-hidden="true" /> Thêm sản phẩm</Button>}
      />

      <div className={styles.sectionCard}>
        <FilterBar
          start={(
            <>
              <SearchBox value={searchTerm} onChange={setSearchTerm} placeholder="Tìm theo tên hoặc SKU" />
              <select className={styles.filterSelect} value={category} onChange={(event) => setCategory(event.target.value)}>
                {productCategories.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
              <select className={styles.filterSelect} value={status} onChange={(event) => setStatus(event.target.value)}>
                {productStatuses.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </>
          )}
          end={(
            <select className={styles.filterSelect} value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              {sortOptions.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          )}
        />
      </div>

      <div className={styles.sectionCard}>
        <DataTable
          columns={columns}
          data={pageItems}
          emptyState={<EmptyState title="Không tìm thấy sản phẩm" description="Thử nới bộ lọc hoặc thay từ khóa tìm kiếm." />}
        />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      <ConfirmDialog
        open={Boolean(selectedProduct)}
        title="Xóa sản phẩm"
        description={selectedProduct ? `Bạn đang chuẩn bị xóa "${selectedProduct.name}". Đây chỉ là UI mock, chưa tác động dữ liệu thật.` : ''}
        confirmText="Xóa sản phẩm"
        onCancel={() => setSelectedProduct(null)}
        onConfirm={() => setSelectedProduct(null)}
      />
    </section>
  );
}

export default ProductsPage;
