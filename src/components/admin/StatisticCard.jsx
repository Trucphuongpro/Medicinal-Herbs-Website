import clsx from 'clsx';
import styles from './AdminShared.module.css';

function StatisticCard({ label, value, change, tone = 'primary', icon }) {
  return (
    <article className={styles.statCard}>
      <div className={styles.statTop}>
        <div>
          <div className={styles.statLabel}>{label}</div>
          <p className={styles.statValue}>{value}</p>
        </div>
        <div className={clsx(styles[`tone${tone.charAt(0).toUpperCase()}${tone.slice(1)}`])}>
          {icon || label.charAt(0)}
        </div>
      </div>
      {change ? <p className={styles.statHint}>{change}</p> : null}
    </article>
  );
}

export default StatisticCard;
