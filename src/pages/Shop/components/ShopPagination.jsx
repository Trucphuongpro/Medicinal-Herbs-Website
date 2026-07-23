import Pagination from '../../../components/common/Pagination';
import styles from './ShopPagination.module.css';

function ShopPagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className={styles.wrapper}>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default ShopPagination;
