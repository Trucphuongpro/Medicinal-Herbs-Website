import styles from './OrdersTabs.module.css';

function OrdersTabs({ tabs, activeTab, onChange }) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Trạng thái đơn hàng">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.key}
          className={`${styles.tab} ${activeTab === tab.key ? styles.active : ''}`}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default OrdersTabs;
