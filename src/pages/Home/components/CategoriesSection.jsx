import SectionHeader from '../../../components/common/SectionHeader';
import styles from './CategoriesSection.module.css';

function CategoriesSection({ categories = [] }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow="Danh mục nổi bật"
          title="Chọn nhanh theo nhu cầu chăm sóc sức khỏe của bạn."
          description="Danh mục được sắp xếp gọn theo mục đích sử dụng để việc chọn dược liệu trở nên dễ hiểu và gần gũi hơn."
        />

        <div className={styles.grid}>
          {categories.map((category) => (
            <article key={category.id} className={styles.card}>
              <div className={styles.icon}>{category.icon}</div>
              <h3 className={styles.name}>{category.name}</h3>
              <p className={styles.description}>{category.description}</p>
              <span className={styles.highlight}>{category.highlight}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSection;
