import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../components/common/Button';
import {
  FormInput,
  FormSelect,
  FormTextarea,
  PageHeader,
  UploadImage,
} from '../../components/admin';
import {
  productCategories,
  productStatuses,
} from '../../mocks/adminData';
import sharedStyles from '../../components/admin/AdminShared.module.css';

const categoryOptions = productCategories.filter((item) => item.value !== 'all');
const statusOptions = productStatuses.filter((item) => item.value !== 'all');

function ProductFormView({
  title,
  subtitle,
  initialValues,
  heroImages,
  galleryImages,
  primaryButtonLabel,
}) {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formValues.name.trim()) nextErrors.name = 'Vui lòng nhập tên sản phẩm.';
    if (!Number(formValues.price) || Number(formValues.price) <= 0) nextErrors.price = 'Giá phải lớn hơn 0.';
    if (Number(formValues.salePrice) < 0) nextErrors.salePrice = 'Giá khuyến mãi không hợp lệ.';
    if (Number(formValues.salePrice) > Number(formValues.price)) nextErrors.salePrice = 'Giá khuyến mãi không được lớn hơn giá gốc.';
    if (Number(formValues.stock) < 0) nextErrors.stock = 'Tồn kho không được âm.';
    if (!formValues.ingredients.trim()) nextErrors.ingredients = 'Vui lòng nhập thành phần.';
    if (!formValues.benefits.trim()) nextErrors.benefits = 'Vui lòng nhập công dụng.';
    if (!formValues.usage.trim()) nextErrors.usage = 'Vui lòng nhập hướng dẫn sử dụng.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      toast.success(`${primaryButtonLabel} thành công (mock UI).`);
    }, 500);
  };

  return (
    <section className={sharedStyles.page}>
      <PageHeader
        eyebrow="Admin Product"
        title={title}
        subtitle={subtitle}
        actions={(
          <>
            <Button variant="ghost">Hủy</Button>
            <Button>{primaryButtonLabel}</Button>
          </>
        )}
      />

      <form className={sharedStyles.page} onSubmit={handleSubmit}>
      <div className={sharedStyles.formGrid}>
        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.sectionHeader}>
            <div>
              <h2 className={sharedStyles.sectionTitle}>Thông tin cơ bản</h2>
              <p className={sharedStyles.sectionDescription}>Xây dựng UI form theo cấu trúc sẵn sàng nối API sau này.</p>
            </div>
          </div>
          <FormInput label="Tên sản phẩm" value={formValues.name} onChange={handleChange('name')} error={errors.name} />
          <div className={sharedStyles.formGrid}>
            <FormSelect
              label="Danh mục"
              value={formValues.category}
              onChange={handleChange('category')}
              options={categoryOptions}
            />
            <FormInput label="Đơn vị" value={formValues.unit} onChange={handleChange('unit')} />
          </div>
          <div className={sharedStyles.formGrid}>
            <FormInput label="Giá" type="number" value={formValues.price} onChange={handleChange('price')} error={errors.price} />
            <FormInput
              label="Giá khuyến mãi"
              type="number"
              value={formValues.salePrice}
              onChange={handleChange('salePrice')}
              error={errors.salePrice}
            />
          </div>
          <div className={sharedStyles.formGrid}>
            <FormInput
              label="Số lượng tồn kho"
              type="number"
              value={formValues.stock}
              onChange={handleChange('stock')}
              error={errors.stock}
            />
            <FormSelect
              label="Trạng thái"
              value={formValues.status}
              onChange={handleChange('status')}
              options={statusOptions}
            />
          </div>
          <FormTextarea
            label="Mô tả"
            value={formValues.description}
            onChange={handleChange('description')}
            placeholder="Nhập mô tả tổng quan cho sản phẩm"
          />
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.sectionHeader}>
            <div>
              <h2 className={sharedStyles.sectionTitle}>Hình ảnh sản phẩm</h2>
              <p className={sharedStyles.sectionDescription}>UI upload sử dụng mock preview, chưa tích hợp API.</p>
            </div>
          </div>
          <UploadImage
            label="Ảnh sản phẩm"
            description="Ảnh đại diện hiển thị tại danh sách và chi tiết sản phẩm."
            images={heroImages}
            buttonText="Chọn ảnh đại diện"
          />
          <UploadImage
            label="Thư viện ảnh"
            description="Thư viện ảnh phụ dùng cho gallery và banner mô tả."
            images={galleryImages}
            buttonText="Thêm ảnh thư viện"
          />
        </div>
      </div>

      <div className={sharedStyles.formGrid}>
        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.sectionHeader}>
            <div>
              <h2 className={sharedStyles.sectionTitle}>Nội dung chuyên môn</h2>
            </div>
          </div>
          <FormTextarea
            label="Thành phần"
            value={formValues.ingredients}
            onChange={handleChange('ingredients')}
            placeholder="Liệt kê thành phần chính"
            error={errors.ingredients}
          />
          <FormTextarea
            label="Công dụng"
            value={formValues.benefits}
            onChange={handleChange('benefits')}
            placeholder="Mô tả công dụng nổi bật"
            error={errors.benefits}
          />
          <FormTextarea
            label="Hướng dẫn sử dụng"
            value={formValues.usage}
            onChange={handleChange('usage')}
            placeholder="Cách dùng và lưu ý"
            error={errors.usage}
          />
        </div>

        <div className={sharedStyles.formSection}>
          <div className={sharedStyles.sectionHeader}>
            <div>
              <h2 className={sharedStyles.sectionTitle}>Hành động</h2>
              <p className={sharedStyles.sectionDescription}>Thiết kế cho luồng tạo và chỉnh sửa sản phẩm.</p>
            </div>
          </div>
          <div className={sharedStyles.stackList}>
            <div className={sharedStyles.stackItem}>
              <div>
                <p className={sharedStyles.itemTitle}>Lưu nháp</p>
                <p className={sharedStyles.itemMeta}>Dùng khi sản phẩm chưa sẵn sàng xuất bản.</p>
              </div>
              <Button variant="outline">Lưu nháp</Button>
            </div>
            <div className={sharedStyles.stackItem}>
              <div>
                <p className={sharedStyles.itemTitle}>Xem trước</p>
                <p className={sharedStyles.itemMeta}>Kiểm tra dữ liệu hiển thị trước khi public.</p>
              </div>
              <Button variant="ghost">Xem trước</Button>
            </div>
            <div className={sharedStyles.stackItem}>
              <div>
                <p className={sharedStyles.itemTitle}>{primaryButtonLabel}</p>
                <p className={sharedStyles.itemMeta}>Nút chính cho thao tác cuối của form.</p>
              </div>
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Đang xử lý...' : primaryButtonLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
      </form>
    </section>
  );
}

export default ProductFormView;
