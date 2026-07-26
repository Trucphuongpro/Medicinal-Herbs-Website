import SectionHeader from '../../../components/common/SectionHeader';
import { processSteps } from '../aboutData';
import styles from './AboutProcessSection.module.css';

function AboutProcessSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeader
          eyebrow="Quy trình"
          title="Cách chúng tôi tổ chức trải nghiệm từ nguồn nguyên liệu đến khi sản phẩm đến tay khách hàng."
          description="Quy trình này được mô tả ngắn gọn để thể hiện sự liền mạch, minh bạch và cảm giác thương hiệu đáng tin cậy."
        />

        <div className={styles.grid}>
          {processSteps.map((step) => (
            <article key={step.id} className={styles.card}>
              <span className={styles.number}>0{step.id}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutProcessSection;
