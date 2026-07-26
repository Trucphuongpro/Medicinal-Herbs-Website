import styles from './AboutBanner.module.css';

function AboutBanner() {
  return (
    <section className={styles.banner}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <span className={styles.badge}>Về thương hiệu</span>
          <h1 className={styles.title}>Chúng tôi xây dựng một trải nghiệm mua dược liệu rõ ràng, nhẹ mắt và đáng tin.</h1>
          <p className={styles.description}>
            Trang giới thiệu tập trung kể câu chuyện về cách chọn lọc dược liệu, cách chúng tôi tổ chức danh mục
            và lý do thương hiệu theo đuổi sự chỉn chu trong từng điểm chạm.
          </p>
        </div>

        <div className={styles.visualCard}>
          <strong>Dược liệu thiên nhiên</strong>
          <p>Trình bày theo nhu cầu thực tế, phù hợp cho cả sử dụng hằng ngày lẫn quà tặng sức khỏe.</p>
        </div>
      </div>
    </section>
  );
}

export default AboutBanner;
