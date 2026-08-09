import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ErrorState from '../../components/common/ErrorState';
import Button from '../../components/common/Button';
import {
  FormInput,
  FormSelect,
  FormTextarea,
  PageHeader,
  UploadImage,
} from '../../components/admin';
import categoryService from '../../services/category.service';
import productService from '../../services/product.service';
import uploadService from '../../services/upload.service';
import { buildProductPayload } from './utils';
import sharedStyles from '../../components/admin/AdminShared.module.css';

const statusOptions = [
  { value: 'active', label: 'Đang bán' },
  { value: 'out_of_stock', label: 'Hết hàng' },
];

function ProductFormView({
  title,
  subtitle,
  initialValues,
  primaryButtonLabel,
  mode,
  productId,
}) {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [pageError, setPageError] = useState('');

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await categoryService.getAll();
        setCategories(response);
      } catch (err) {
        setPageError(err.response?.data?.message || 'Không thể tải danh mục cho form sản phẩm.');
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (!categories.length) return;

    setFormValues((prev) => {
      if (prev.category) return prev;
      return {
        ...prev,
        category: categories[0].id,
      };
    });
  }, [categories]);

  const categoryOptions = useMemo(
    () =>
      categories.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    [categories],
  );

  const heroImages = formValues.image
    ? [{ src: formValues.image, label: 'Ảnh đại diện hiện tại' }]
    : [];
  const galleryImages = heroImages;

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formValues.name.trim()) nextErrors.name = 'Vui lòng nhập tên sản phẩm.';
    if (!formValues.category) nextErrors.category = 'Vui lòng chọn danh mục.';
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

  const handleUploadImage = async (files) => {
    const [file] = files;
    if (!file) return;

    try {
      setUploading(true);
      setPageError('');
      const response = await uploadService.uploadImage(file);
      setFormValues((prev) => ({
        ...prev,
        image: response.secure_url,
      }));
      toast.success('Tải ảnh thành công.');
    } catch (err) {
      setPageError(err.response?.data?.message || 'Không thể tải ảnh lên.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      setPageError('');
      const payload = buildProductPayload(formValues);

      if (mode === 'edit' && productId) {
        await productService.update(productId, payload);
      } else {
        await productService.create(payload);
      }

      setSubmitting(false);
      toast.success(`${primaryButtonLabel} thành công.`);
      navigate('/admin/products');
    } catch (err) {
      setSubmitting(false);
      setPageError(err.response?.data?.message || 'Không thể lưu sản phẩm.');
    }
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

      {pageError ? <ErrorState message={pageError} /> : null}

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
              hint={!categoryOptions.length ? 'Chưa tải được danh mục hoặc chưa có danh mục nào.' : undefined}
              error={errors.category}
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
            description="Ảnh đại diện hiển thị tại danh sách và chi tiết sản phẩm, đang upload qua API backend."
            images={heroImages}
            buttonText="Chọn ảnh đại diện"
            onSelectFiles={handleUploadImage}
            uploading={uploading}
            disabled={submitting}
          />
          <UploadImage
            label="Thư viện ảnh"
            description="Backend hiện chỉ có một trường ảnh chính, nên thư viện đang hiển thị cùng ảnh đại diện."
            images={galleryImages}
            buttonText="Cập nhật ảnh"
            onSelectFiles={handleUploadImage}
            uploading={uploading}
            disabled={submitting}
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
              <Button variant="outline" disabled>
                Lưu nháp
              </Button>
            </div>
            <div className={sharedStyles.stackItem}>
              <div>
                <p className={sharedStyles.itemTitle}>Xem trước</p>
                <p className={sharedStyles.itemMeta}>Kiểm tra dữ liệu hiển thị trước khi public.</p>
              </div>
              <Button variant="ghost" disabled>
                Xem trước
              </Button>
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
