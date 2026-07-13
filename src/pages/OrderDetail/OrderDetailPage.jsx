import { useParams } from 'react-router-dom';

function OrderDetailPage() {
  const { id } = useParams();

  return (
    <>
      <h1 className="page-title">Chi tiết đơn hàng</h1>
      <p>Mã đơn hàng: {id}</p>
    </>
  );
}

export default OrderDetailPage;
