import { FiImage, FiUploadCloud } from 'react-icons/fi';
import ImagePreview from './ImagePreview';
import styles from './AdminShared.module.css';

function UploadImage({ label, description, images = [], buttonText = 'Chọn ảnh mô phỏng' }) {
  return (
    <div className={styles.fieldGroup}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={styles.uploadBox}>
        <button type="button" className={styles.uploadButton}>
          {images.length ? <FiImage aria-hidden="true" /> : <FiUploadCloud aria-hidden="true" />}
          <span>{buttonText}</span>
        </button>
        {description ? <span className={styles.fieldHint}>{description}</span> : null}
        {images.length ? <ImagePreview images={images} /> : null}
      </div>
    </div>
  );
}

export default UploadImage;
