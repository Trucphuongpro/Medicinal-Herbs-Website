import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ProductDetailBreadcrumb,
  ProductDescription,
  ProductGallery,
  ProductIngredients,
  ProductInformation,
  ProductReviews,
  ProductUsage,
  QuantitySelector,
  RelatedProducts,
} from './components';
import { productDetailMock, relatedProducts } from './productDetailData';
import styles from './ProductDetailPage.module.css';

function ProductDetailPage() {
  const { id } = useParams();
  const product = useMemo(
    () => productDetailMock.find((item) => item.id === id) || productDetailMock[0],
    [id],
  );
  const [selectedImage, setSelectedImage] = useState(product.gallery[0]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedImage(product.gallery[0]);
    setQuantity(1);
  }, [product]);

  const handleDecrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleIncrease = () => {
    setQuantity((current) => Math.min(product.stockCount, current + 1));
  };

  const handleQuantityChange = (value) => {
    if (Number.isNaN(value)) return;
    const nextValue = Math.min(product.stockCount, Math.max(1, value));
    setQuantity(nextValue);
  };

  return (
    <section className={`page-section ${styles.page}`}>
      <div className="container">
        <ProductDetailBreadcrumb productName={product.name} />

        <div className={styles.topSection}>
          <ProductGallery
            images={product.gallery}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
          />

          <div className={styles.infoColumn}>
            <ProductInformation product={product} />
            <QuantitySelector
              quantity={quantity}
              stockCount={product.stockCount}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
              onChange={handleQuantityChange}
            />
          </div>
        </div>

        <div className={styles.contentSections}>
          <ProductDescription content={product.description} />
          <ProductIngredients items={product.ingredients} />
          <ProductUsage steps={product.usage} />
          <ProductReviews reviews={product.reviews} averageRating={product.rating} />
        </div>

        <RelatedProducts products={relatedProducts} />
      </div>
    </section>
  );
}

export default ProductDetailPage;
