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
  return (
    <>
      <Hero />
      <CategoriesSection />
      <FeaturedProducts />
      <BestSellerSection />
      <PromotionBanner />
      <AboutSection />
      <Testimonials />
      <BlogSection />
      <Newsletter />
    </>
  );
}

export default HomePage;
