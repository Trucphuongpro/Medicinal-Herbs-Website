import styles from './CheckoutPaymentMethod.module.css';

function CheckoutPaymentMethod({ methods, selectedPayment, onSelectPayment }) {
  return (
    <section className={styles.section}>
      <div>
        <h2 className={styles.title}>Payment Method</h2>
        <p className={styles.description}>Các lựa chọn dưới đây là mock để hoàn thiện trải nghiệm checkout.</p>
      </div>

      <div className={styles.list}>
        {methods.map((method) => (
          <label
            key={method.id}
            className={`${styles.option} ${selectedPayment === method.id ? styles.active : ''}`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={selectedPayment === method.id}
              onChange={() => onSelectPayment(method.id)}
            />
            <div>
              <strong>{method.label}</strong>
              <p>{method.description}</p>
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}

export default CheckoutPaymentMethod;
