import SearchBar from '../../../components/common/SearchBar';
import styles from './SearchHeader.module.css';

function SearchHeader({ query, resultCount }) {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1 className="page-title">Kết quả tìm kiếm</h1>
        <p className={styles.description}>
          {query
            ? `Hiển thị ${resultCount} kết quả phù hợp cho từ khóa "${query}".`
            : 'Nhập từ khóa để khám phá các sản phẩm dược liệu phù hợp.'}
        </p>
      </div>

      <div className={styles.searchWrap}>
        <SearchBar defaultValue={query} placeholder="Tìm lại sản phẩm, thảo mộc, quà tặng..." />
      </div>
    </div>
  );
}

export default SearchHeader;
