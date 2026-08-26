import SectionHeader from '../../../components/common/SectionHeader';
import styles from './CategoriesSection.module.css';

function CategoriesSection({ categories = [] }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow="Danh mục nổi bật"
          title="Chọn nhanh theo nhu cầu chăm sóc sức khỏe của bạn."
        />

        <div className={styles.grid}>
          {categories.map((category) => (
            <article key={category.id} className={styles.card}>
              {category.thumbnail ? (
                <img src={category.thumbnail} alt="" className={styles.thumbnail} />
              ) : (
                <div className={styles.thumbnailFallback} aria-hidden="true" />
              )}
              <h3 className={styles.name}>{category.name}</h3>
              <span className={styles.highlight}>{category.highlight}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
