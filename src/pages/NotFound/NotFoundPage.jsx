import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <section className={`page-section ${styles.page}`}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.illustration} aria-hidden="true">
            <div className={styles.orbit} />
            <div className={styles.center}>404</div>
          </div>

          <div className={styles.content}>
            <h1 className={styles.title}>Trang bạn đang tìm không còn ở đây.</h1>
            <p className={styles.message}>
              Có thể đường dẫn đã thay đổi, trang đã bị xóa hoặc bạn vừa đi lạc khỏi khu vực cửa hàng dược liệu của chúng tôi.
            </p>
            <Link to="/">
              <Button size="lg">Về trang chủ</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
