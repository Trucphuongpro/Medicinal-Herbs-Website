import { useState } from 'react';
import { FiEye, FiEyeOff, FiTrash2 } from 'react-icons/fi';
import {
  ActionButton,
  ConfirmDialog,
  DataTable,
  PageHeader,
  StatusBadge,
} from '../../components/admin';
import { reviews } from '../../mocks/adminData';
import { formatDate } from './utils';
import styles from '../../components/admin/AdminShared.module.css';

function ReviewsPage() {
  const [selectedReview, setSelectedReview] = useState(null);

  const columns = [
    { key: 'user', label: 'Người dùng' },
    { key: 'product', label: 'Sản phẩm' },
    {
      key: 'rating',
      label: 'Rating',
      render: (row) => <span className={styles.rating}>{'★'.repeat(row.rating)}{'☆'.repeat(5 - row.rating)}</span>,
    },
    { key: 'content', label: 'Nội dung' },
    { key: 'date', label: 'Ngày', render: (row) => formatDate(row.date) },
    {
      key: 'actions',
      label: 'Action',
      render: (row) => (
        <div className={styles.actions}>
          <ActionButton tone="ghost" icon={<FiEye aria-hidden="true" />}>Xem</ActionButton>
          <ActionButton tone="secondary" icon={<FiEyeOff aria-hidden="true" />}>
            {row.status === 'hidden' ? 'Hiện' : 'Ẩn'}
          </ActionButton>
          <ActionButton tone="danger" icon={<FiTrash2 aria-hidden="true" />} onClick={() => setSelectedReview(row)}>
            Xóa
          </ActionButton>
        </div>
      ),
    },
  ];

  return (
    <section className={styles.page}>
      <PageHeader
        title="Quản lý đánh giá"
        subtitle="Tập hợp đánh giá mới, rating sản phẩm và các thao tác kiểm duyệt nội dung."
      />
      <div className={styles.sectionCard}>
        <DataTable columns={columns} data={reviews.map((item) => ({ ...item, statusNode: <StatusBadge status={item.status} /> }))} />
      </div>
      <ConfirmDialog
        open={Boolean(selectedReview)}
        title="Xóa đánh giá"
        description={selectedReview ? `Bạn đang xóa đánh giá của ${selectedReview.user} cho sản phẩm ${selectedReview.product}.` : ''}
        confirmText="Xóa đánh giá"
        onCancel={() => setSelectedReview(null)}
        onConfirm={() => setSelectedReview(null)}
      />
    </section>
  );
}

export default ReviewsPage;
