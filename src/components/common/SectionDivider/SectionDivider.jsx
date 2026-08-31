import styles from './SectionDivider.module.css';

/**
 * Duong phan cach co cum la o giua, dung de tach cac khoi lon tren mot trang.
 * Thuan trang tri nen an voi trinh doc man hinh.
 */
function SectionDivider() {
  return <div className={styles.divider} role="presentation" aria-hidden="true" />;
}

export default SectionDivider;
