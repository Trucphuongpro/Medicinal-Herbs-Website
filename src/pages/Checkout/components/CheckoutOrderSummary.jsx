import { formatCurrency } from '../../../utils/format';
import styles from './CheckoutOrderSummary.module.css';

function SummaryRow({ label, value, strong = false, muted = false }) {
  return (
    <div className={`${styles.row} ${strong ? styles.strongRow : ''}`}>
      <span>{label}</span>
      <strong className={muted ? styles.mutedValue : ''}>{value}</strong>
    </div>
  );
}

function CheckoutOrderSummary({ subtotal, shippingFee, discount, total }) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Order Summary</h2>

      <div className={styles.rows}>
        <SummaryRow label="Tạm tính" value={formatCurrency(subtotal)} />
        <SummaryRow label="Phí vận chuyển" value={formatCurrency(shippingFee)} />
        <SummaryRow label="Giảm giá" value={`- ${formatCurrency(discount)}`} muted />
        <SummaryRow label="Tổng cộng" value={formatCurrency(total)} strong />
      </div>
    </section>
  );
}

export default CheckoutOrderSummary;
