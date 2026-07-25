import Button from '../../../components/common/Button';
import styles from './CheckoutSection.module.css';

function CheckoutSection({ disabled }) {
  return (
    <section className={styles.card}>
      <Button fullWidth size="lg" disabled={disabled}>
        Tiến hành thanh toán
      </Button>
      <p className={styles.helper}>
        Đây là giao diện mock cho nút Checkout, chưa kết nối luồng thanh toán thật.
      </p>
    </section>
  );
}

export default CheckoutSection;
