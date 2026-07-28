import Button from '../../../components/common/Button';
import styles from './CheckoutSection.module.css';

function CheckoutSection({ disabled, onCheckout }) {
  return (
    <section className={styles.card}>
      <Button fullWidth size="lg" disabled={disabled} onClick={onCheckout}>
        Tiến hành thanh toán
      </Button>
      <p className={styles.helper}>Bạn sẽ được chuyển sang bước xác nhận thông tin và đặt hàng.</p>
    </section>
  );
}

export default CheckoutSection;
