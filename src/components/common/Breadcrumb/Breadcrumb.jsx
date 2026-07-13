import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Breadcrumb.module.css';

function Breadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.label} className={styles.item}>
            {index > 0 && <span className={styles.separator} aria-hidden="true">/</span>}
            {isLast || !item.path ? (
              <span className={clsx(isLast && styles.current)} aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            ) : (
              <Link to={item.path} className={styles.link}>
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
