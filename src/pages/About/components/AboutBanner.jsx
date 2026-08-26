import styles from './AboutBanner.module.css';

function AboutBanner() {
  return (
    <section className={styles.banner}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <span className={styles.badge}>Về thương hiệu</span>
          <h1 className={styles.title}>Chúng tôi xây dựng một trải nghiệm mua dược liệu rõ ràng, nhẹ mắt và đáng tin.</h1>
          <p className={styles.description}>
            Từ vùng trồng đến lúc gói hàng, mỗi bước đều được ghi lại rõ ràng để bạn biết mình
            đang dùng gì và dùng thế nào.
          </p>
        </div>

        <figure className={styles.visualCard}>
          <img
            src="/images/products/tinh-dau-sa-chanh.jpg"
            alt="Bụi sả chanh đang phát triển trong vườn dược liệu"
            className={styles.visualImage}
          />
          <figcaption className={styles.visualCaption}>
            <strong>Dược liệu thiên nhiên</strong>
            <p>Thu hái theo mùa, sơ chế thủ công và ghi rõ nguồn gốc trên từng bao bì.</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default AboutBanner;
