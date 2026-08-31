import styles from './AboutBanner.module.css';

function AboutBanner() {
  return (
    <section className={styles.banner}>
      <div className="container">
        <div className={styles.cover}>
          <img
            src="/images/banner-mangden.jpg"
            alt="Dược liệu Măng Đen: sâm, nấm linh chi, kỷ tử và táo đỏ bày trên bàn gỗ, phía sau là rừng thông Kon Tum lúc bình minh"
            className={styles.coverImage}
            width="1536"
            height="1024"
            loading="eager"
          />

          <div className={styles.overlay}>
            <span className={styles.badge}>Về thương hiệu</span>
            <h1 className={styles.title}>
              Dược liệu Măng Đen, từ vùng trồng đến tay bạn.
            </h1>
            <p className={styles.description}>
              Thu hái theo mùa, sơ chế thủ công, ghi rõ nguồn gốc trên từng bao bì. Mỗi bước đều
              được ghi lại để bạn biết mình đang dùng gì và dùng thế nào.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutBanner;
