import { useEffect, useState } from 'react';
import categoryService from '../../services/category.service';
import productService from '../../services/product.service';
import {
  AboutBanner,
  AboutCertificationSection,
  AboutClosingCta,
  AboutGalleryStrip,
  AboutIntroSection,
  AboutProcessSection,
  AboutValuesSection,
} from './components';

function AboutPage() {
  const [counts, setCounts] = useState({ productCount: 0, categoryCount: 0 });

  useEffect(() => {
    let active = true;

    Promise.all([productService.getAll(), categoryService.getAll()])
      .then(([products, categories]) => {
        if (!active) return;
        setCounts({
          productCount: Array.isArray(products) ? products.length : 0,
          categoryCount: Array.isArray(categories) ? categories.length : 0,
        });
      })
      .catch(() => {
        // Khong lay duoc so lieu thi de 0, cac phan con lai van hien binh thuong.
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <AboutBanner />
      <AboutIntroSection {...counts} />
      <AboutProcessSection />
      <AboutGalleryStrip />
      <AboutValuesSection />
      <AboutCertificationSection />
      <AboutClosingCta />
    </>
  );
}

export default AboutPage;
