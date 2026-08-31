import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthRequiredDialog from '../../components/common/AuthRequiredDialog';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import { isAuthenticated } from '../../utils/token';
import cartService from '../../services/cart.service';
import productService from '../../services/product.service';
import reviewService from '../../services/review.service';
import { mapProductDetail, mapProductToCard } from '../../utils/apiMappers';
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
import styles from './ProductDetailPage.module.css';

function ProductDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cartError, setCartError] = useState('');
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        setLoading(true);
        setError('');

        const [productResponse, reviewsResponse, allProductsResponse] = await Promise.all([
          productService.getById(id),
          reviewService.getByProduct(id),
          productService.getAll(),
        ]);

        const mappedProduct = mapProductDetail(productResponse, reviewsResponse);
        const mappedRelatedProducts = allProductsResponse
          .filter((item) => item.id !== id && item.category_id === productResponse.category_id)
          .slice(0, 4)
          .map((item) => mapProductToCard(item));

        setProduct(mappedProduct);
        setRelatedProducts(mappedRelatedProducts);
        setSelectedImage(mappedProduct.gallery[0] || null);
        setQuantity(1);
      } catch (err) {
        setError(err.response?.data?.message || 'Không thể tải chi tiết sản phẩm.');
      } finally {
        setLoading(false);
      }
    };

    loadProductDetail();
  }, [id]);

  const handleDecrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleIncrease = () => {
    setQuantity((current) => Math.min(product?.stockCount || 1, current + 1));
  };

  const handleQuantityChange = (value) => {
    if (Number.isNaN(value)) return;
    const nextValue = Math.min(product?.stockCount || 1, Math.max(1, value));
    setQuantity(nextValue);
  };

  const handleAddToCart = async () => {
    if (!product) return false;

    // Khach chua dang nhap thi moi dang nhap, khong de API tra ve loi 401.
    if (!isAuthenticated()) {
      setCartError('');
      setShowAuthDialog(true);
      return false;
    }

    try {
      setIsAddingToCart(true);
      setCartError('');
      await cartService.addItem({
        productId: product.id,
        quantity,
      });
      return true;
    } catch (err) {
      setCartError(err.response?.data?.message || 'Không thể thêm sản phẩm vào giỏ hàng.');
      return false;
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    const added = await handleAddToCart();
    if (added) {
      navigate('/checkout');
    }
  };

  if (loading) {
    return <Loading fullScreen text="Đang tải chi tiết sản phẩm..." />;
  }

  if (error) {
    return (
      <section className={`page-section ${styles.page}`}>
        <div className="container">
          <ErrorState message={error} />
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className={`page-section ${styles.page}`}>
        <div className="container">
          <EmptyState
            title="Không tìm thấy sản phẩm"
            description="Sản phẩm bạn đang tìm không còn tồn tại hoặc chưa được backend trả về."
          />
        </div>
      </section>
    );
  }

  if (!selectedImage) {
    return <Loading fullScreen text="Đang chuẩn bị hình ảnh sản phẩm..." />;
  }

  return (
    <section className={`page-section ${styles.page}`}>
      <AuthRequiredDialog open={showAuthDialog} onClose={() => setShowAuthDialog(false)} />
      <div className="container">
        <ProductDetailBreadcrumb productName={product.name} />

        <div className={styles.topSection}>
          <ProductGallery
            images={product.gallery}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
          />

          <div className={styles.infoColumn}>
            <ProductInformation
              product={product}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              isAddingToCart={isAddingToCart}
              cartError={cartError}
            />
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
