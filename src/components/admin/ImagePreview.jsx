import styles from './AdminShared.module.css';

function ImagePreview({ images = [] }) {
  return (
    <div className={styles.previewGrid}>
      {images.map((image, index) => (
        <figure key={`${image.src}-${index}`} className={styles.previewCard}>
          <img src={image.src} alt={image.alt || image.label || `preview-${index + 1}`} />
          {image.label ? <figcaption className={styles.previewCaption}>{image.label}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

export default ImagePreview;
