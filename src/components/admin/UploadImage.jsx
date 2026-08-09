import { FiImage, FiUploadCloud } from 'react-icons/fi';
import ImagePreview from './ImagePreview';
import styles from './AdminShared.module.css';

function UploadImage({
  label,
  description,
  images = [],
  buttonText = 'Chọn ảnh',
  onSelectFiles,
  uploading = false,
  disabled = false,
}) {
  return (
    <div className={styles.fieldGroup}>
      <span className={styles.fieldLabel}>{label}</span>
      <div className={styles.uploadBox}>
        <button
          type="button"
          className={styles.uploadButton}
          onClick={() => {
            if (!onSelectFiles) return;

            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.multiple = false;
            input.onchange = (event) => {
              const nextFiles = Array.from(event.target.files || []);
              if (nextFiles.length) {
                onSelectFiles(nextFiles);
              }
            };
            input.click();
          }}
          disabled={disabled || uploading}
        >
          {images.length ? <FiImage aria-hidden="true" /> : <FiUploadCloud aria-hidden="true" />}
          <span>{uploading ? 'Đang tải ảnh...' : buttonText}</span>
        </button>
        {description ? <span className={styles.fieldHint}>{description}</span> : null}
        {images.length ? <ImagePreview images={images} /> : null}
      </div>
    </div>
  );
}

export default UploadImage;
