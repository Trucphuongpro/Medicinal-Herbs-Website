import styles from './SectionHeader.module.css';

function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`${styles.header} ${align === 'center' ? styles.center : ''}`}>
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
}

export default SectionHeader;
