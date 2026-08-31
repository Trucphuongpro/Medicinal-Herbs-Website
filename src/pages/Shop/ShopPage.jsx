import { useEffect, useMemo, useState } from 'react';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import categoryService from '../../services/category.service';
import productService from '../../services/product.service';
import { mapProductToCard } from '../../utils/apiMappers';
import {
  ShopBreadcrumb,
  ShopPagination,
  ProductGrid,
  ShopSidebarFilter,
  ShopSortBar,
} from './components';
import { sortOptions } from './shopData';
import styles from './ShopPage.module.css';

const PRODUCTS_PER_PAGE = 6;

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState(sortOptions[0].value);

  useEffect(() => {
    const loadShopData = async () => {
      try {
        setLoading(true);
        setError('');

        const [productResponse, categoryResponse] = await Promise.all([
          productService.getAll(),
          categoryService.getAll(),
        ]);

        setProducts(productResponse.map((product) => mapProductToCard(product)));
        setCategories(categoryResponse);
      } catch (err) {
        setError(err.response?.data?.message || 'Không thể tải dữ liệu cửa hàng.');
      } finally {
        setLoading(false);
      }
    };

    loadShopData();
  }, []);

  const categoryOptions = useMemo(
    () => [
      { value: 'all', label: 'Tất cả danh mục' },
      ...categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    ],
    [categories],
  );

  const filteredProducts = useMemo(() => {
    const nextProducts = products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
      const matchesPrice =
        selectedPrice === 'all' ||
        (selectedPrice === 'under-200' && product.price < 200000) ||
        (selectedPrice === '200-500' && product.price >= 200000 && product.price <= 500000) ||
        (selectedPrice === 'over-500' && product.price > 500000);
      const matchesRating = selectedRating === 'all' || product.rating >= Number(selectedRating);
      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'in-stock' && product.stock > 0) ||
        (selectedStatus === 'out-of-stock' && product.stock <= 0);

      return matchesCategory && matchesPrice && matchesRating && matchesStatus;
    });

    return [...nextProducts].sort((productA, productB) => {
      switch (sortBy) {
        case 'price-asc':
          return productA.price - productB.price;
        case 'price-desc':
          return productB.price - productA.price;
        case 'rating-desc':
          return productB.rating - productA.rating;
        case 'name-asc':
          return productA.name.localeCompare(productB.name, 'vi');
        default:
          return new Date(productB.createdAt) - new Date(productA.createdAt);
      }
    });
  }, [products, selectedCategory, selectedPrice, selectedRating, selectedStatus, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [currentPage, filteredProducts]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handlePriceChange = (value) => {
    setSelectedPrice(value);
    setCurrentPage(1);
  };

  const handleRatingChange = (value) => {
    setSelectedRating(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedPrice('all');
    setSelectedRating('all');
    setSelectedStatus('all');
    setSortBy(sortOptions[0].value);
    setCurrentPage(1);
  };

  if (loading) {
    return <Loading fullScreen text="Đang tải danh sách sản phẩm..." />;
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

  return (
    <section className={`page-section ${styles.page}`}>
      <div className="container">
        <ShopBreadcrumb />

        <div className={styles.hero}>
          <div>
            <h1 className="page-title">Cửa hàng dược liệu</h1>
            <p className={styles.description}>
              Khám phá bộ sưu tập dược liệu, trà thảo mộc và set quà sức khỏe với cách phân loại rõ
              ràng, dễ lọc và dễ chọn hơn.
            </p>
          </div>
          <div className={styles.heroBadge}>
            <strong>{products.length}+</strong>
            <span>Sản phẩm đang hiển thị trong giao diện Shop</span>
          </div>
        </div>

        <div className={styles.layout}>
          <ShopSidebarFilter
            categoryOptions={categoryOptions}
            selectedCategory={selectedCategory}
            selectedPrice={selectedPrice}
            selectedRating={selectedRating}
            selectedStatus={selectedStatus}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
            onRatingChange={handleRatingChange}
            onStatusChange={handleStatusChange}
            onClearFilters={clearFilters}
          />

          <div className={styles.content}>
            <ShopSortBar
              totalProducts={filteredProducts.length}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />

            <ProductGrid products={paginatedProducts} />

            <ShopPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ShopPage;
