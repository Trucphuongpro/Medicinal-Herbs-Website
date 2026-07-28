import { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import Button from '../../components/common/Button';
import {
  DataTable,
  FormInput,
  FormSelect,
  PageHeader,
  StatusBadge,
} from '../../components/admin';
import { couponFormInitialValues, coupons } from '../../mocks/adminData';
import styles from '../../components/admin/AdminShared.module.css';

const couponStatusOptions = [
  { value: 'active', label: 'Đang hoạt động' },
  { value: 'expired', label: 'Hết hạn' },
  { value: 'hidden', label: 'Tạm ẩn' },
];

const couponTypeOptions = [
  { value: 'percent', label: 'Phần trăm' },
  { value: 'amount', label: 'Tiền mặt' },
];

function CouponsPage() {
  const [formValues, setFormValues] = useState(couponFormInitialValues);

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const columns = [
    { key: 'code', label: 'Mã' },
    { key: 'type', label: 'Loại giảm' },
    { key: 'value', label: 'Giá trị' },
    { key: 'quantity', label: 'Số lượng' },
    { key: 'expiredAt', label: 'Ngày hết hạn' },
    { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} /> },
  ];

  return (
    <section className={styles.page}>
      <PageHeader
        title="Quản lý mã giảm giá"
        subtitle="Kết hợp table theo dõi coupon với form thêm và sửa trong cùng một màn hình quản trị."
        actions={<Button><FiPlusCircle aria-hidden="true" /> Tạo mã mới</Button>}
      />

      <div className={styles.gridTwo}>
        <div className={styles.sectionCard}>
          <DataTable columns={columns} data={coupons} />
        </div>

        <div className={styles.formSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Form thêm / sửa mã giảm giá</h2>
              <p className={styles.sectionDescription}>Mock form sẵn sàng cho cả create và update.</p>
            </div>
          </div>
          <FormInput label="Mã giảm giá" value={formValues.code} onChange={handleChange('code')} />
          <div className={styles.formGrid}>
            <FormSelect label="Loại giảm" value={formValues.type} onChange={handleChange('type')} options={couponTypeOptions} />
            <FormInput label="Giá trị" value={formValues.value} onChange={handleChange('value')} />
          </div>
          <div className={styles.formGrid}>
            <FormInput label="Số lượng" type="number" value={formValues.quantity} onChange={handleChange('quantity')} />
            <FormInput label="Ngày hết hạn" type="date" value={formValues.expiredAt} onChange={handleChange('expiredAt')} />
          </div>
          <FormSelect label="Trạng thái" value={formValues.status} onChange={handleChange('status')} options={couponStatusOptions} />
          <div className={styles.footerActions}>
            <Button variant="ghost">Hủy</Button>
            <Button>Lưu coupon</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CouponsPage;
