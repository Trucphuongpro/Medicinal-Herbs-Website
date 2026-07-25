import Input from '../../../components/common/Input';
import styles from './CheckoutFormSection.module.css';

function CheckoutReceiver({ formState, onFieldChange }) {
  return (
    <section className={styles.section}>
      <div>
        <h2 className={styles.title}>Receiver</h2>
        <p className={styles.description}>Người nhận hàng và ghi chú giao hàng cho đơn hiện tại.</p>
      </div>

      <div className={styles.grid}>
        <Input
          label="Họ và tên người nhận"
          name="receiverName"
          value={formState.receiverName}
          onChange={onFieldChange('receiverName')}
        />
        <Input
          label="Số điện thoại"
          name="receiverPhone"
          type="tel"
          value={formState.receiverPhone}
          onChange={onFieldChange('receiverPhone')}
        />
        <Input
          label="Ghi chú"
          name="note"
          value={formState.note}
          onChange={onFieldChange('note')}
          wrapperClassName={styles.full}
          hint="Ví dụ: giao giờ hành chính, gọi trước khi tới."
        />
      </div>
    </section>
  );
}

export default CheckoutReceiver;
