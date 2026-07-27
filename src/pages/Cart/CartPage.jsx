import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import cartService from '../../services/cart.service';
import { mapCartItem } from '../../utils/apiMappers';
import {
  CartHeader,
  CartProductList,
  CheckoutSection,
  OrderSummary,
  VoucherBox,
} from './components';
import { voucherOptions } from './cartData';
import styles from './CartPage.module.css';

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  const loadCart = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await cartService.getCart();
      setCartItems((response.items || []).map(mapCartItem));
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải giỏ hàng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  const discount = useMemo(() => {
    if (!appliedVoucher) return 0;

    if (appliedVoucher.type === 'percentage') {
      return Math.round((subtotal * appliedVoucher.value) / 100);
    }

    return appliedVoucher.value;
  }, [appliedVoucher, subtotal]);

  const shippingFee = cartItems.length ? 30000 : 0;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const handleQuantityChange = async (id, nextQuantity) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    if (!item) return;

    const quantity = Math.max(1, Math.min(item.maxQuantity, nextQuantity));

    try {
      setUpdatingId(id);
      const response = await cartService.updateItem(id, { quantity });
      setCartItems((response.items || []).map(mapCartItem));
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể cập nhật số lượng.');
    } finally {
      setUpdatingId('');
    }
  };

  const handleRemove = async (id) => {
    try {
      setUpdatingId(id);
      const response = await cartService.removeItem(id);
      setCartItems((response.items || []).map(mapCartItem));
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể xóa sản phẩm khỏi giỏ hàng.');
    } finally {
      setUpdatingId('');
    }
  };

  const handleApplyVoucher = () => {
    const normalizedCode = voucherCode.trim().toUpperCase();
    const matchedVoucher = voucherOptions.find((voucher) => voucher.code === normalizedCode) || null;

    setAppliedVoucher(matchedVoucher);
  };

  if (loading) {
    return <Loading fullScreen text="Đang tải giỏ hàng..." />;
  }

  if (error && !cartItems.length) {
    return (
      <section className={`page-section ${styles.page}`}>
        <div className="container">
          <ErrorState message={error} onRetry={loadCart} />
        </div>
      </section>
    );
  }

  return (
    <section className={`page-section ${styles.page}`}>
      <div className="container">
        <CartHeader itemCount={cartItems.length} />

        <div className={styles.layout}>
          <div className={styles.productsColumn}>
            <CartProductList
              items={cartItems}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
              updatingId={updatingId}
            />
          </div>

          <aside className={styles.summaryColumn}>
            <VoucherBox
              voucherCode={voucherCode}
              onVoucherCodeChange={setVoucherCode}
              onApplyVoucher={handleApplyVoucher}
              appliedVoucher={appliedVoucher}
            />
            <OrderSummary
              subtotal={subtotal}
              shippingFee={shippingFee}
              discount={discount}
              total={total}
            />
            <CheckoutSection disabled={!cartItems.length} onCheckout={() => navigate('/checkout')} />
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
