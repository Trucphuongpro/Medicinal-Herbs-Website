import SectionHeader from '../../../components/common/SectionHeader';
import { companyInfo } from '../contactData';
import styles from './ContactCompanyInfo.module.css';

function ContactCompanyInfo() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow="Thông tin công ty"
          title="Những đầu mối liên hệ chính để bạn dễ kết nối với thương hiệu."
          description="Phần này được trình bày dưới dạng card để sau này thay nội dung thật mà không cần đổi cấu trúc giao diện."
        />

        <div className={styles.grid}>
          {companyInfo.map((item) => (
            <article key={item.title} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactCompanyInfo;
