import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <section className="page-section">
      <div className="container">
        <h1 className="page-title">Tìm kiếm</h1>
        {query ? (
          <p>Kết quả tìm kiếm cho: &quot;{query}&quot;</p>
        ) : (
          <p>Nhập từ khóa để tìm kiếm sản phẩm.</p>
        )}
      </div>
    </section>
  );
}

export default SearchPage;
