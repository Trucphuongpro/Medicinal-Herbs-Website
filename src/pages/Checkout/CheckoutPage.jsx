import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import cartService from '../../services/cart.service';
import orderService from '../../services/order.service';
import paymentService from '../../services/payment.service';
import userService from '../../services/user.service';
import { buildShippingAddress, mapCartItem } from '../../utils/apiMappers';
import {
  CheckoutHeader,
  CheckoutOrderSummary,
  CheckoutPaymentMethod,
  CheckoutPlaceOrder,
  CheckoutProductList,
  CheckoutReceiver,
  CheckoutShippingAddress,
  CheckoutVoucher,
} from './components';
import { initialFormState, voucherOptions } from './checkoutData';
import styles from './CheckoutPage.module.css';

function CheckoutPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formState, setFormState] = useState(initialFormState);
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  useEffect(() => {
    const loadCheckoutData = async () => {
      try {
        setLoading(true);
        setError('');

        const [cartResponse, paymentResponse, profileResponse] = await Promise.all([
          cartService.getCart(),
          paymentService.getMethods(),
          userService.getProfile(),
        ]);

        setCartItems((cartResponse.items || []).map(mapCartItem));
        setPaymentMethods(paymentResponse);
        setSelectedPayment(paymentResponse[0]?.id || 'cod');
        setFormState((current) => ({
          ...current,
          receiverName: profileResponse.fullname || current.receiverName,
          receiverPhone: profileResponse.phone || current.receiverPhone,
        }));
      } catch (err) {
        setError(err.response?.data?.message || 'Không thể tải dữ liệu checkout.');
      } finally {
        setLoading(false);
      }
    };

    loadCheckoutData();
  }, []);

  const subtotal = useMemo(
    () => cartItems.reduce((total, product) => total + product.price * product.quantity, 0),
    [cartItems],
  );

  const discount = useMemo(() => {
    if (!appliedVoucher) return 0;

    if (appliedVoucher.type === 'percentage') {
      return Math.round((subtotal * appliedVoucher.value) / 100);
    }

    return appliedVoucher.value;
  }, [appliedVoucher, subtotal]);

  const shippingFee = 30000;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const handleFieldChange = (field) => (event) => {
    setFormState((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleApplyVoucher = () => {
    const normalizedCode = voucherCode.trim().toUpperCase();
    const matchedVoucher = voucherOptions.find((voucher) => voucher.code === normalizedCode) || null;
    setAppliedVoucher(matchedVoucher);
  };

  const handlePlaceOrder = async () => {
    try {
      setSubmitting(true);
      setError('');

      const order = await orderService.create({
        payment_method: selectedPayment,
        phone: formState.receiverPhone,
        shipping_address: buildShippingAddress(formState),
      });

      navigate(`/orders/${order.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể đặt hàng.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading fullScreen text="Đang tải trang thanh toán..." />;
  }

  if (error && !cartItems.length) {
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
        <CheckoutHeader productCount={cartItems.length} />

        <div className={styles.layout}>
          <div className={styles.formColumn}>
            <CheckoutShippingAddress
              formState={formState}
              onFieldChange={handleFieldChange}
            />
            <CheckoutReceiver formState={formState} onFieldChange={handleFieldChange} />
            <CheckoutPaymentMethod
              methods={paymentMethods}
              selectedPayment={selectedPayment}
              onSelectPayment={setSelectedPayment}
            />
          </div>

          <aside className={styles.summaryColumn}>
            <CheckoutProductList products={cartItems} />
            <CheckoutVoucher
              voucherCode={voucherCode}
              onVoucherCodeChange={setVoucherCode}
              onApplyVoucher={handleApplyVoucher}
              appliedVoucher={appliedVoucher}
            />
            <CheckoutOrderSummary
              subtotal={subtotal}
              shippingFee={shippingFee}
              discount={discount}
              total={total}
            />
            <CheckoutPlaceOrder
              paymentLabel={paymentMethods.find((item) => item.id === selectedPayment)?.label}
              onPlaceOrder={handlePlaceOrder}
              disabled={!cartItems.length || submitting}
              submitting={submitting}
              error={error}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
