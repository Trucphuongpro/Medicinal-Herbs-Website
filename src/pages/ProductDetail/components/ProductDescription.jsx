import styles from './DetailSection.module.css';

function ProductDescription({ content }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Mô tả sản phẩm</h2>
      <p className={styles.text}>{content}</p>
    </section>
  );
}

export default ProductDescription;
