import Pagination from '../../../components/common/Pagination';
import styles from './SearchPagination.module.css';

function SearchPagination({ currentPage, totalPages, onPageChange }) {
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

export default SearchPagination;
