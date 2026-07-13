import clsx from 'clsx';
import styles from './Pagination.module.css';

function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={styles.pagination} aria-label="Phân trang">
      <button
        type="button"
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Trang trước"
      >
        ‹
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={clsx(styles.pageButton, page === currentPage && styles.active)}
          onClick={() => onPageChange(page)}
          aria-label={`Trang ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Trang sau"
      >
        ›
      </button>
    </nav>
  );
}

export default Pagination;
