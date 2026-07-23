import { Link } from 'react-router-dom';
import SectionHeader from '../../../components/common/SectionHeader';
import { blogPosts } from '../homeData';
import styles from './BlogSection.module.css';

function BlogSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.headerRow}>
          <SectionHeader
            eyebrow="Góc chia sẻ"
            title="Nội dung nhẹ nhàng để khách hiểu cách dùng và chọn quà dễ hơn."
            description="Phần blog bổ sung độ tin cậy và giúp trang chủ có thêm lớp nội dung định hướng, nhưng vẫn giữ bố cục thoáng."
          />

          <Link to="/about" className={styles.link}>
            Xem thêm bài viết
          </Link>
        </div>

        <div className={styles.grid}>
          {blogPosts.map((post) => (
            <article key={post.id} className={styles.card}>
              <div className={styles.thumbnail}>
                <span>{post.tag}</span>
              </div>
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span>{post.tag}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className={styles.title}>{post.title}</h3>
                <p className={styles.excerpt}>{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
