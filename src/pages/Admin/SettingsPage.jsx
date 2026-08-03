import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import {
  FormInput,
  FormTextarea,
  PageHeader,
  UploadImage,
} from '../../components/admin';
import { settingsInitialValues, products } from '../../mocks/adminData';
import styles from '../../components/admin/AdminShared.module.css';

function SettingsPage() {
  const [settings, setSettings] = useState(settingsInitialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (event) => {
    setSettings((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!settings.storeName.trim()) nextErrors.storeName = 'Vui lòng nhập tên cửa hàng.';
    if (!settings.hotline.trim()) nextErrors.hotline = 'Vui lòng nhập hotline.';
    if (!settings.email.trim()) nextErrors.email = 'Vui lòng nhập email.';
    if (!settings.address.trim()) nextErrors.address = 'Vui lòng nhập địa chỉ.';
    if (!settings.policy.trim()) nextErrors.policy = 'Vui lòng nhập chính sách.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      toast.success('Đã lưu cài đặt cửa hàng (mock UI).');
    }, 450);
  };

  return (
    <section className={styles.page}>
      <PageHeader
        title="Cài đặt"
        subtitle="Biểu mẫu thông tin cửa hàng, tài nguyên thương hiệu và nội dung chính sách."
        actions={<Button>Lưu cài đặt</Button>}
      />

      <form className={styles.formGrid} onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <FormInput label="Tên cửa hàng" value={settings.storeName} onChange={handleChange('storeName')} error={errors.storeName} />
          <FormInput label="Hotline" value={settings.hotline} onChange={handleChange('hotline')} error={errors.hotline} />
          <FormInput label="Email" value={settings.email} onChange={handleChange('email')} error={errors.email} />
          <FormInput label="Địa chỉ" value={settings.address} onChange={handleChange('address')} error={errors.address} />
          <FormInput label="Facebook" value={settings.facebook} onChange={handleChange('facebook')} />
          <FormInput label="Zalo" value={settings.zalo} onChange={handleChange('zalo')} />
          <FormTextarea label="Chính sách" value={settings.policy} onChange={handleChange('policy')} error={errors.policy} />
          <div className={styles.footerActions}>
            <Button type="submit" disabled={submitting}>{submitting ? 'Đang lưu...' : 'Lưu cài đặt'}</Button>
          </div>
        </div>

        <div className={styles.formSection}>
          <UploadImage
            label="Logo"
            description={`File hiện tại: ${settings.logo}`}
            images={[{ src: products[1].image, label: 'Logo placeholder' }]}
            buttonText="Đổi logo"
          />
          <UploadImage
            label="Banner"
            description={`File hiện tại: ${settings.banner}`}
            images={products.slice(2, 5).map((item, index) => ({
              src: item.image,
              label: `Banner ${index + 1}`,
            }))}
            buttonText="Đổi banner"
          />
        </div>
      </form>
    </section>
  );
}

export default SettingsPage;
