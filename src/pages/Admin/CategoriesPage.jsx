import { useState } from 'react';
import { FiEdit2, FiFolderPlus, FiTrash2 } from 'react-icons/fi';
import Button from '../../components/common/Button';
import {
  ActionButton,
  ConfirmDialog,
  DataTable,
  PageHeader,
  StatusBadge,
} from '../../components/admin';
import { categories } from '../../mocks/adminData';
import styles from '../../components/admin/AdminShared.module.css';

function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const columns = [
    { key: 'name', label: 'Tên' },
    { key: 'slug', label: 'Slug' },
    { key: 'description', label: 'Mô tả' },
    { key: 'productCount', label: 'Số sản phẩm' },
    { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} /> },
    {
      key: 'actions',
      label: 'Action',
      render: (row) => (
        <div className={styles.actions}>
          <ActionButton tone="secondary" icon={<FiEdit2 aria-hidden="true" />}>Sửa</ActionButton>
          <ActionButton tone="danger" icon={<FiTrash2 aria-hidden="true" />} onClick={() => setSelectedCategory(row)}>
            Xóa
          </ActionButton>
        </div>
      ),
    },
  ];

  return (
    <section className={styles.page}>
      <PageHeader
        title="Quản lý danh mục"
        subtitle="Tập trung quản lý taxonomy sản phẩm, slug, trạng thái hiển thị và số lượng sản phẩm liên quan."
        actions={<Button><FiFolderPlus aria-hidden="true" /> Thêm danh mục</Button>}
      />

      <div className={styles.sectionCard}>
        <DataTable columns={columns} data={categories} />
      </div>

      <ConfirmDialog
        open={Boolean(selectedCategory)}
        title="Xóa danh mục"
        description={selectedCategory ? `Xác nhận xóa danh mục "${selectedCategory.name}"? Đây là hộp thoại mock cho UI.` : ''}
        confirmText="Xóa danh mục"
        onCancel={() => setSelectedCategory(null)}
        onConfirm={() => setSelectedCategory(null)}
      />
    </section>
  );
}

export default CategoriesPage;
