import {
  categoryOptions,
  priceOptions,
  ratingOptions,
  statusOptions,
} from '../shopData';
import styles from './ShopSidebarFilter.module.css';

function FilterGroup({ title, name, options, selectedValue, onChange }) {
  return (
    <div className={styles.group}>
      <h2 className={styles.groupTitle}>{title}</h2>
      <div className={styles.options}>
        {options.map((option) => (
          <label key={option.value} className={styles.option}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={(event) => onChange(event.target.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function ShopSidebarFilter({
  selectedCategory,
  selectedPrice,
  selectedRating,
  selectedStatus,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onStatusChange,
  onClearFilters,
}) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Sidebar filter</p>
          <h2 className={styles.title}>Lọc sản phẩm</h2>
        </div>
        <button type="button" className={styles.clearButton} onClick={onClearFilters}>
          Xóa lọc
        </button>
      </div>

      <FilterGroup
        title="Danh mục"
        name="category"
        options={categoryOptions}
        selectedValue={selectedCategory}
        onChange={onCategoryChange}
      />

      <FilterGroup
        title="Khoảng giá"
        name="price"
        options={priceOptions}
        selectedValue={selectedPrice}
        onChange={onPriceChange}
      />

      <FilterGroup
        title="Đánh giá"
        name="rating"
        options={ratingOptions}
        selectedValue={selectedRating}
        onChange={onRatingChange}
      />

      <FilterGroup
        title="Tình trạng"
        name="status"
        options={statusOptions}
        selectedValue={selectedStatus}
        onChange={onStatusChange}
      />
    </aside>
  );
}

export default ShopSidebarFilter;
