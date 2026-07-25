import styles from './ProductGallery.module.css';

function ProductGallery({ images, selectedImage, onSelectImage }) {
  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrap}>
        <img src={selectedImage.src} alt={selectedImage.alt} className={styles.mainImage} />
      </div>

      <div className={styles.thumbnailRow}>
        {images.map((image) => (
          <button
            key={image.id}
            type="button"
            className={`${styles.thumbnailButton} ${
              image.id === selectedImage.id ? styles.thumbnailActive : ''
            }`}
            onClick={() => onSelectImage(image)}
            aria-label={image.alt}
          >
            <img src={image.src} alt={image.alt} className={styles.thumbnailImage} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
