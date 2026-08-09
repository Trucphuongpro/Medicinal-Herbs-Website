import { useState } from 'react';
import { FiEdit2, FiFolderPlus, FiTrash2 } from 'react-icons/fi';
import Button from '../../components/common/Button';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import {
  ActionButton,
  ConfirmDialog,
  DataTable,
  PageHeader,
  StatusBadge,
} from '../../components/admin';
import { useEffect } from 'react';
import categoryService from '../../services/category.service';
import EmptyState from '../../components/common/EmptyState';
import { buildCategoryPayload, mapApiCategoryToAdminRow } from './utils';
import styles from '../../components/admin/AdminShared.module.css';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await categoryService.getAll();
      setCategories(response.map(mapApiCategoryToAdminRow));
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải danh mục.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreateCategory = async () => {
    const name = window.prompt('Nhập tên danh mục mới');
    if (!name?.trim()) return;

    try {
      await categoryService.create(buildCategoryPayload(name));
      await loadCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tạo danh mục.');
    }
  };

  const handleEditCategory = async (category) => {
    const name = window.prompt('Cập nhật tên danh mục', category.name);
    if (!name?.trim() || name.trim() === category.name) return;

    try {
      await categoryService.update(category.id, buildCategoryPayload(name));
      await loadCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể cập nhật danh mục.');
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;

    try {
      await categoryService.remove(selectedCategory.id);
      setSelectedCategory(null);
      await loadCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể xóa danh mục.');
    }
  };

  if (loading) {
    return <Loading fullScreen text="Đang tải danh mục..." />;
  }

  if (error && !categories.length) {
    return <ErrorState message={error} onRetry={loadCategories} />;
  }

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
          <ActionButton tone="secondary" icon={<FiEdit2 aria-hidden="true" />} onClick={() => handleEditCategory(row)}>Sửa</ActionButton>
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
        subtitle="Danh mục đang lấy từ backend và cho phép tạo, sửa, xóa trực tiếp trong phạm vi API hiện có."
        actions={<Button onClick={handleCreateCategory}><FiFolderPlus aria-hidden="true" /> Thêm danh mục</Button>}
      />

      {error ? <ErrorState message={error} /> : null}

      <div className={styles.sectionCard}>
        <DataTable
          columns={columns}
          data={categories}
          emptyState={
            <EmptyState
              title="Chưa có danh mục"
              description="Backend hiện chưa trả về danh mục nào."
            />
          }
        />
      </div>

      <ConfirmDialog
        open={Boolean(selectedCategory)}
        title="Xóa danh mục"
        description={selectedCategory ? `Xác nhận xóa danh mục "${selectedCategory.name}" khỏi dữ liệu thật?` : ''}
        confirmText="Xóa danh mục"
        onCancel={() => setSelectedCategory(null)}
        onConfirm={handleDeleteCategory}
      />
    </section>
  );
}

export default CategoriesPage;
