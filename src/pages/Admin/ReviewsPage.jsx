import { useEffect, useState } from 'react';
import { FiEye, FiEyeOff, FiTrash2 } from 'react-icons/fi';
import {
  ActionButton,
  ConfirmDialog,
  DataTable,
  PageHeader,
} from '../../components/admin';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import reviewService from '../../services/review.service';
import { formatDate } from './utils';
import { mapApiReviewToAdminRow } from './utils';
import styles from '../../components/admin/AdminShared.module.css';

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await reviewService.getAllAdmin();
      setReviews((response || []).map(mapApiReviewToAdminRow));
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải danh sách đánh giá.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleToggleVisibility = async (review) => {
    try {
      await reviewService.updateVisibility(review.id, {
        is_hidden: !review.isHidden,
      });
      await loadReviews();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể cập nhật trạng thái hiển thị của đánh giá.');
    }
  };

  const handleDeleteReview = async () => {
    if (!selectedReview) return;

    try {
      await reviewService.removeAdmin(selectedReview.id);
      setSelectedReview(null);
      await loadReviews();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể xóa đánh giá.');
    }
  };

  if (loading) {
    return <Loading fullScreen text="Đang tải đánh giá..." />;
  }

  if (error && !reviews.length) {
    return <ErrorState message={error} onRetry={loadReviews} />;
  }

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
          <ActionButton tone="ghost" icon={<FiEye aria-hidden="true" />} onClick={() => window.alert(`${row.user}\n${row.product}\n${row.content}`)}>Xem</ActionButton>
          <ActionButton tone="secondary" icon={<FiEyeOff aria-hidden="true" />} onClick={() => handleToggleVisibility(row)}>
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
        subtitle="Danh sách đánh giá đang lấy từ backend, hỗ trợ ẩn hoặc hiện và xóa review ở chế độ admin."
      />

      {error ? <ErrorState message={error} /> : null}

      <div className={styles.sectionCard}>
        <DataTable
          columns={columns}
          data={reviews}
          emptyState={
            <EmptyState
              title="Chưa có đánh giá"
              description="Backend hiện chưa trả về đánh giá nào cho admin."
            />
          }
        />
      </div>
      <ConfirmDialog
        open={Boolean(selectedReview)}
        title="Xóa đánh giá"
        description={selectedReview ? `Bạn đang xóa đánh giá của ${selectedReview.user} cho sản phẩm ${selectedReview.product}.` : ''}
        confirmText="Xóa đánh giá"
        onCancel={() => setSelectedReview(null)}
        onConfirm={handleDeleteReview}
      />
    </section>
  );
}

export default ReviewsPage;
