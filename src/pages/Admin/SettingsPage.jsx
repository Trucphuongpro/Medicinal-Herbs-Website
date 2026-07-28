import { useState } from 'react';
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

  const handleChange = (field) => (event) => {
    setSettings((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <section className={styles.page}>
      <PageHeader
        title="Cài đặt"
        subtitle="Biểu mẫu thông tin cửa hàng, tài nguyên thương hiệu và nội dung chính sách."
        actions={<Button>Lưu cài đặt</Button>}
      />

      <div className={styles.formGrid}>
        <div className={styles.formSection}>
          <FormInput label="Tên cửa hàng" value={settings.storeName} onChange={handleChange('storeName')} />
          <FormInput label="Hotline" value={settings.hotline} onChange={handleChange('hotline')} />
          <FormInput label="Email" value={settings.email} onChange={handleChange('email')} />
          <FormInput label="Địa chỉ" value={settings.address} onChange={handleChange('address')} />
          <FormInput label="Facebook" value={settings.facebook} onChange={handleChange('facebook')} />
          <FormInput label="Zalo" value={settings.zalo} onChange={handleChange('zalo')} />
          <FormTextarea label="Chính sách" value={settings.policy} onChange={handleChange('policy')} />
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
      </div>
    </section>
  );
}

export default SettingsPage;
