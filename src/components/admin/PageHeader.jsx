import styles from './AdminShared.module.css';

function PageHeader({ eyebrow = 'Admin', title, subtitle, actions }) {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.pageHeaderContent}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 className={styles.pageTitle}>{title}</h1>
        {subtitle ? <p className={styles.pageSubtitle}>{subtitle}</p> : null}
      </div>
      {actions ? <div className={styles.pageHeaderActions}>{actions}</div> : null}
    </div>
  );
}

export default PageHeader;
