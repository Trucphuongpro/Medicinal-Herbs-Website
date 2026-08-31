import { useEffect, useState } from 'react';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import SectionDivider from '../../components/common/SectionDivider';
import categoryService from '../../services/category.service';
import productService from '../../services/product.service';
import { mapCategoryToCard, mapProductToCard } from '../../utils/apiMappers';
import {
  AboutSection,
  BestSellerSection,
  FeaturedProducts,
  Hero,
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
      <FeaturedProducts products={products.slice(0, 4)} />
      <SectionDivider />
      <BestSellerSection products={products.slice(4, 8).length ? products.slice(4, 8) : products.slice(0, 4)} />
      <PromotionBanner />
      <AboutSection productCount={products.length} categoryCount={categories.length} />
      <SectionDivider />
      <Testimonials />
    </>
  );
}

export default HomePage;
