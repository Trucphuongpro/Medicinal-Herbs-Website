import clsx from 'clsx';
import styles from './AdminShared.module.css';

const badgeMap = {
  active: 'statusActive',
  completed: 'statusCompleted',
  visible: 'statusVisible',
  pending: 'statusPending',
  draft: 'statusDraft',
  processing: 'statusProcessing',
  shipping: 'statusShipping',
  cancelled: 'statusCancelled',
  locked: 'statusLocked',
  hidden: 'statusHidden',
  expired: 'statusExpired',
  out_of_stock: 'statusOutOfStock',
  inactive: 'statusInactive',
  current: 'statusCurrent',
  upcoming: 'statusUpcoming',
};

const labelMap = {
  active: 'Đang hoạt động',
  completed: 'Hoàn thành',
  visible: 'Hiển thị',
  pending: 'Chờ xác nhận',
  draft: 'Nháp',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  cancelled: 'Đã hủy',
  locked: 'Đã khóa',
  hidden: 'Đã ẩn',
  expired: 'Hết hạn',
  out_of_stock: 'Hết hàng',
  inactive: 'Ngưng hoạt động',
  current: 'Đang diễn ra',
  upcoming: 'Sắp tới',
};

function StatusBadge({ status, children }) {
  return (
    <span className={clsx(styles.statusBadge, styles[badgeMap[status] || 'statusUpcoming'])}>
      {children || labelMap[status] || status}
    </span>
  );
}

export default StatusBadge;
