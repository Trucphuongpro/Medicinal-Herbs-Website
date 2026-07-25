import { useMemo, useState } from 'react';
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
import { initialFormState, paymentMethods, products, voucherOptions } from './checkoutData';
import styles from './CheckoutPage.module.css';

function CheckoutPage() {
  const [formState, setFormState] = useState(initialFormState);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  const subtotal = useMemo(
    () => products.reduce((total, product) => total + product.price * product.quantity, 0),
    [],
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

  return (
    <section className={`page-section ${styles.page}`}>
      <div className="container">
        <CheckoutHeader productCount={products.length} />

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
            <CheckoutProductList products={products} />
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
            <CheckoutPlaceOrder paymentLabel={paymentMethods.find((item) => item.id === selectedPayment)?.label} />
          </aside>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
