import { useState } from 'react';
import { newsletterBenefits } from '../homeData';
import styles from './Newsletter.module.css';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <span className={styles.badge}>Newsletter</span>
            <h2 className={styles.title}>Nhận thêm cảm hứng chăm sóc sức khỏe theo cách nhẹ nhàng hơn.</h2>
            <p className={styles.description}>
              Form này dùng mock interaction để hoàn thiện trải nghiệm giao diện, không gửi dữ liệu
              ra ngoài.
            </p>

            <div className={styles.benefits}>
              {newsletterBenefits.map((benefit) => (
                <span key={benefit} className={styles.benefit}>
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="newsletter-email">
              Email của bạn
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={styles.input}
              placeholder="nhapemail@example.com"
            />
            <button type="submit" className={styles.button}>
              Đăng ký nhận tin
            </button>
            <p className={styles.helper}>
              {submitted
                ? 'Đăng ký mock thành công. Bạn có thể thay đổi nội dung này khi nối API thật.'
                : 'Chúng tôi chỉ dùng nội dung mô phỏng để hoàn thiện phần giao diện.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
