import { useMemo, useState } from 'react';
import {
  CartHeader,
  CartProductList,
  CheckoutSection,
  OrderSummary,
  VoucherBox,
} from './components';
import { cartItems as initialCartItems, voucherOptions } from './cartData';
import styles from './CartPage.module.css';

function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);

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

  const handleQuantityChange = (id, nextQuantity) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, Math.min(item.maxQuantity, nextQuantity)),
            }
          : item,
      ),
    );
  };

  const handleRemove = (id) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const handleApplyVoucher = () => {
    const normalizedCode = voucherCode.trim().toUpperCase();
    const matchedVoucher = voucherOptions.find((voucher) => voucher.code === normalizedCode) || null;

    setAppliedVoucher(matchedVoucher);
  };

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
            <CheckoutSection disabled={!cartItems.length} />
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
