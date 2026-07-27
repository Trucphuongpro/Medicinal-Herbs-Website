import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import orderService from '../../services/order.service';
import { formatCurrency, formatDate } from '../../utils/format';

function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [canceling, setCanceling] = useState(false);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await orderService.getById(id);
      setOrder(response);
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải chi tiết đơn hàng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  const handleCancelOrder = async () => {
    try {
      setCanceling(true);
      setError('');
      await orderService.cancel(id);
      await loadOrder();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể hủy đơn hàng.');
    } finally {
      setCanceling(false);
    }
  };

  if (loading) {
    return <Loading fullScreen text="Đang tải chi tiết đơn hàng..." />;
  }

  if (error && !order) {
    return <ErrorState message={error} onRetry={loadOrder} />;
  }

  return (
    <section>
      <h1 className="page-title">Chi tiết đơn hàng</h1>
      <p>Mã đơn hàng: {order.id}</p>
      <p>Ngày tạo: {formatDate(order.created_at)}</p>
      <p>Trạng thái: {order.status}</p>
      <p>Tổng tiền: {formatCurrency(Number(order.total_price || 0))}</p>
      <p>Số điện thoại: {order.phone}</p>
      <p>Địa chỉ giao hàng: {order.shipping_address}</p>

      <div>
        <h2>Danh sách sản phẩm</h2>
        {(order.items || []).length ? (
          order.items.map((item) => (
            <p key={item.id}>
              {item.product_id} - SL: {item.quantity} - Giá: {formatCurrency(Number(item.price || 0))}
            </p>
          ))
        ) : (
          <p>Đơn hàng chưa có sản phẩm hiển thị.</p>
        )}
      </div>

      {order.status === 'pending' ? (
        <Button onClick={handleCancelOrder} disabled={canceling}>
          {canceling ? 'Đang hủy đơn...' : 'Hủy đơn hàng'}
        </Button>
      ) : null}

      {error ? <p>{error}</p> : null}
    </section>
  );
}

export default OrderDetailPage;
