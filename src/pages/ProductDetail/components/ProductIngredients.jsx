import styles from './DetailSection.module.css';

function ProductIngredients({ items }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Thành phần</h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default ProductIngredients;
