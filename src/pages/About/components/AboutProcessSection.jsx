import { processSteps } from '../aboutData';
import styles from './AboutProcessSection.module.css';

function AboutProcessSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.eyebrow}>Quy trình của chúng tôi</span>
          <h2 className={styles.title}>Từ thiên nhiên đến tay bạn</h2>
          <span className={styles.rule} aria-hidden="true" />
        </header>

        <ol className={styles.grid}>
          {processSteps.map((step) => (
            <li key={step.id} className={styles.step}>
              <div className={styles.thumb}>
                <img src={step.image} alt={step.alt} className={styles.thumbImage} loading="lazy" />
                <span className={styles.number}>0{step.id}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default AboutProcessSection;
