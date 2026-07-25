import styles from './CheckoutHeader.module.css';

function CheckoutHeader({ productCount }) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className="page-title">Thanh toán đơn hàng</h1>
        <p className={styles.description}>
          Hoàn tất thông tin nhận hàng, chọn phương thức thanh toán và kiểm tra lại đơn trước khi đặt.
        </p>
      </div>

      <div className={styles.badge}>
        <strong>{productCount}</strong>
        <span>Sản phẩm sẵn sàng thanh toán</span>
      </div>
    </div>
  );
}

export default CheckoutHeader;
