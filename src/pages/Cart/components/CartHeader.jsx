import styles from './CartHeader.module.css';

function CartHeader({ itemCount }) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className="page-title">Giỏ hàng của bạn</h1>
        <p className={styles.description}>
          Kiểm tra lại các sản phẩm đã chọn, cập nhật số lượng và áp voucher trước khi tiếp tục thanh toán.
        </p>
      </div>

      <div className={styles.badge}>
        <strong>{itemCount}</strong>
        <span>Sản phẩm đang có trong giỏ</span>
      </div>
    </div>
  );
}

export default CartHeader;
