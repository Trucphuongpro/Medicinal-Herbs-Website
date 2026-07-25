import styles from './DetailSection.module.css';

function ProductUsage({ steps }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Cách sử dụng</h2>
      <ol className={styles.list}>
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}

export default ProductUsage;
