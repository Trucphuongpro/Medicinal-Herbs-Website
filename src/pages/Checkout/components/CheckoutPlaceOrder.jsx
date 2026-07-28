import Button from '../../../components/common/Button';
import styles from './CheckoutPlaceOrder.module.css';

function CheckoutPlaceOrder({ paymentLabel, onPlaceOrder, disabled, submitting, error }) {
  return (
    <section className={styles.card}>
      <Button fullWidth size="lg" onClick={onPlaceOrder} disabled={disabled}>
        {submitting ? 'Đang đặt hàng...' : 'Đặt hàng'}
      </Button>
      <p className={styles.helper}>
        Phương thức đang chọn: <strong>{paymentLabel}</strong>
      </p>
      <p className={styles.note}>Đơn hàng sẽ được tạo trực tiếp từ các sản phẩm đang có trong giỏ hàng.</p>
      {error ? <p className={styles.note}>{error}</p> : null}
    </section>
  );
}

export default CheckoutPlaceOrder;
