import Button from '../../../components/common/Button';
import styles from './CheckoutPlaceOrder.module.css';

function CheckoutPlaceOrder({ paymentLabel }) {
  return (
    <section className={styles.card}>
      <Button fullWidth size="lg">
        Đặt hàng
      </Button>
      <p className={styles.helper}>
        Phương thức đang chọn: <strong>{paymentLabel}</strong>
      </p>
      <p className={styles.note}>
        Đây là giao diện mock cho bước đặt hàng, chưa kết nối API hoặc luồng thanh toán thật.
      </p>
    </section>
  );
}

export default CheckoutPlaceOrder;
