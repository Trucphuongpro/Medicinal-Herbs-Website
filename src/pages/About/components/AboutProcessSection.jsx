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
        />

        <div className={styles.grid}>
          {processSteps.map((step) => (
            <article key={step.id} className={styles.card}>
              <div className={styles.thumb}>
                <img src={step.image} alt={step.alt} className={styles.thumbImage} />
                <span className={styles.number}>0{step.id}</span>
              </div>
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
