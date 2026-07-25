import Input from '../../../components/common/Input';
import styles from './CheckoutFormSection.module.css';

function CheckoutShippingAddress({ formState, onFieldChange }) {
  return (
    <section className={styles.section}>
      <div>
        <h2 className={styles.title}>Shipping Address</h2>
        <p className={styles.description}>Thông tin khu vực giao hàng để hệ thống mock tính phí và hiển thị đơn.</p>
      </div>

      <div className={styles.grid}>
        <Input
          label="Tỉnh / Thành phố"
          name="province"
          value={formState.province}
          onChange={onFieldChange('province')}
        />
        <Input
          label="Quận / Huyện"
          name="district"
          value={formState.district}
          onChange={onFieldChange('district')}
        />
        <Input
          label="Phường / Xã"
          name="ward"
          value={formState.ward}
          onChange={onFieldChange('ward')}
        />
        <Input
          label="Địa chỉ chi tiết"
          name="address"
          value={formState.address}
          onChange={onFieldChange('address')}
        />
      </div>
    </section>
  );
}

export default CheckoutShippingAddress;
