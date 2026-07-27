import { useEffect, useState } from 'react';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import categoryService from '../../services/category.service';
import productService from '../../services/product.service';
import { mapCategoryToCard, mapProductToCard } from '../../utils/apiMappers';
import {
  AboutSection,
  BestSellerSection,
  BlogSection,
  CategoriesSection,
  FeaturedProducts,
  Hero,
  Newsletter,
  PromotionBanner,
  Testimonials,
} from './components';

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        setError('');

        const [categoryResponse, productResponse] = await Promise.all([
          categoryService.getAll(),
          productService.getAll(),
        ]);

        setCategories(categoryResponse.map(mapCategoryToCard));
        setProducts(productResponse.map((product) => mapProductToCard(product)));
      } catch (err) {
        setError(err.response?.data?.message || 'Không thể tải dữ liệu trang chủ.');
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  if (loading) {
    return <Loading fullScreen text="Đang tải trang chủ..." />;
  }

  if (error) {
    return (
      <section className="page-section">
        <div className="container">
          <ErrorState message={error} />
        </div>
      </section>
    );
  }

  return (
    <>
      <Hero />
      {categories.length ? (
        <CategoriesSection categories={categories} />
      ) : (
        <section className="page-section">
          <div className="container">
            <EmptyState
              title="Chưa có danh mục"
              description="Backend chưa trả về danh mục nào để hiển thị trên trang chủ."
            />
          </div>
        </section>
      )}
      <FeaturedProducts products={products.slice(0, 4)} />
      <BestSellerSection products={products.slice(4, 8).length ? products.slice(4, 8) : products.slice(0, 4)} />
      <PromotionBanner />
      <AboutSection />
      <Testimonials />
      <BlogSection />
      <Newsletter />
    </>
  );
}

export default HomePage;
