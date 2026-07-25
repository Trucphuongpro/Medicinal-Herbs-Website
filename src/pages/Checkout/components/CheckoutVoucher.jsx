import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import styles from './CheckoutVoucher.module.css';

function CheckoutVoucher({
  voucherCode,
  onVoucherCodeChange,
  onApplyVoucher,
  appliedVoucher,
}) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h2>Voucher</h2>
        <span>Thử `HERB10` hoặc `FREESHIP`</span>
      </div>

      <div className={styles.formRow}>
        <Input
          name="voucher"
          placeholder="Nhập mã giảm giá"
          value={voucherCode}
          onChange={(event) => onVoucherCodeChange(event.target.value)}
          wrapperClassName={styles.inputWrap}
        />
        <Button type="button" variant="outline" onClick={onApplyVoucher}>
          Áp dụng
        </Button>
      </div>

      {appliedVoucher ? (
        <p className={styles.success}>
          Đã áp dụng {appliedVoucher.code}: {appliedVoucher.description}
        </p>
      ) : (
        <p className={styles.helper}>Voucher hoạt động ở mức mock interaction, không gọi API.</p>
      )}
    </section>
  );
}

export default CheckoutVoucher;
