import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import productService from '../../services/product.service';
import { mapProductToCard } from '../../utils/apiMappers';
import { SearchFilter, SearchHeader, SearchProductGrid, SearchPagination } from './components';
import { defaultFilter, filterOptions } from './searchData';
import styles from './SearchPage.module.css';

const PRODUCTS_PER_PAGE = 6;

function SearchPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await productService.getAll();
        setProducts(response.map((product) => mapProductToCard(product)));
      } catch (err) {
        setError(err.response?.data?.message || 'Không thể tải dữ liệu tìm kiếm.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const byQuery = !normalizedQuery
      ? products
      : products.filter((product) =>
          [product.name, product.category, product.description].some((value) =>
            value.toLowerCase().includes(normalizedQuery),
          ),
        );

    if (selectedFilter === 'all') return byQuery;
    return byQuery.filter((product) => product.filterKey === selectedFilter);
  }, [products, query, selectedFilter]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const visibleProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [currentPage, filteredProducts]);

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) {
    return <Loading fullScreen text="Đang tải kết quả tìm kiếm..." />;
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
        <SearchHeader query={query} resultCount={filteredProducts.length} />
        <SearchFilter
          options={filterOptions}
          selectedFilter={selectedFilter}
          onChange={handleFilterChange}
        />
        <SearchProductGrid products={visibleProducts} query={query} />
        <SearchPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}

export default SearchPage;
