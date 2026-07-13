import { useParams } from 'react-router-dom';

function ProductDetailPage() {
  const { id } = useParams();

  return (
    <section className="page-section">
      <div className="container">
        <h1 className="page-title">Chi tiết sản phẩm</h1>
        <p>ID sản phẩm: {id}</p>
      </div>
    </section>
  );
}

export default ProductDetailPage;
