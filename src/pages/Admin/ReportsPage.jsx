import { PageHeader, StatisticCard } from '../../components/admin';
import { reportCards } from '../../mocks/adminData';
import styles from '../../components/admin/AdminShared.module.css';

function ReportsPage() {
  return (
    <section className={styles.page}>
      <PageHeader
        title="Báo cáo"
        subtitle="Giao diện dashboard báo cáo với các placeholder thống kê doanh thu, đơn hàng và danh mục bán chạy."
      />

      <div className={styles.gridThree}>
        {reportCards.map((card, index) => (
          <StatisticCard
            key={card.key}
            label={card.label}
            value={card.value}
            change={card.hint}
            tone={['primary', 'info', 'success', 'warning'][index % 4]}
          />
        ))}
      </div>

      <div className={styles.gridTwo}>
        <div className={styles.placeholder}>
          <span className={styles.eyebrow}>Biểu đồ</span>
          <div className={styles.placeholderValue}>Revenue</div>
          <p className={styles.pageSubtitle}>Placeholder cho biểu đồ doanh thu theo chu kỳ thời gian.</p>
        </div>
        <div className={styles.placeholder}>
          <span className={styles.eyebrow}>Biểu đồ</span>
          <div className={styles.placeholderValue}>Orders</div>
          <p className={styles.pageSubtitle}>Placeholder cho biểu đồ số lượng đơn hàng và xu hướng tăng trưởng.</p>
        </div>
      </div>
    </section>
  );
}

export default ReportsPage;
