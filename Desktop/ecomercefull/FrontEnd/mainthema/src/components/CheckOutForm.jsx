import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { initiatePayment } from "../redux/paymentSlice";
import { createOrder } from "../redux/orderSlice"; // Order slice'ı import edin
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const CheckoutForm = ({ totalAmount, shippingAddress, items }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { loading, error, paymentStatus } = useSelector((state) => state.payment);
  const [paymentMethod, setPaymentMethod] = useState('creditcard');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      alertify.error("Stripe has not loaded properly. Please try again.");
      return;
    }

    if (paymentMethod === 'creditcard') {
      try {
        // Ödeme işlemini başlat
        const paymentResult = await dispatch(initiatePayment({ stripe, elements, amount: totalAmount })).unwrap();
        if (paymentResult) {
          // Ödeme başarılı oldu, sipariş verilerini oluştur
          const orderData = {
            totalAmount,
            shippingAddress,
            items: items.map(item => ({
              productId: item.product.id,
              quantity: item.quantity,
              price: item.product.price,
            })),
            orderStatus: 'Pending',
            paymentStatus: 'Paid',
            trackingId: generateTrackingId(), // Rastgele bir takip numarası oluşturma
          };

          // Siparişi oluştur
          await dispatch(createOrder(orderData));
          alertify.success("Order created and payment successful!");
        } else {
          alertify.error("Payment failed. Please try again.");
        }
      } catch (error) {
        alertify.error(error.message || "Payment failed. Please try again.");
      }
    } else if (paymentMethod === 'banktransfer') {
      // Banka havalesi işlemleri burada işlenebilir
      alertify.success("Bank transfer selected. Please follow the instructions to complete the payment.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h4>Payment Method</h4>
      <div className="payment-methods">
        <label>
          <input
            type="radio"
            value="creditcard"
            checked={paymentMethod === 'creditcard'}
            onChange={() => setPaymentMethod('creditcard')}
          />
          Credit Card
        </label>
        <label>
          <input
            type="radio"
            value="banktransfer"
            checked={paymentMethod === 'banktransfer'}
            onChange={() => setPaymentMethod('banktransfer')}
          />
          Bank Transfer
        </label>
      </div>

      {paymentMethod === 'creditcard' && (
        <div className="card-element-container">
          <h4>Card Details</h4>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  letterSpacing: '0.025em',
                  fontFamily: 'Source Code Pro, monospace',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      )}

      {paymentMethod === 'banktransfer' && (
        <div className="bank-transfer-info">
          <h4>Bank Transfer Instructions</h4>
          <p>Please transfer the total amount to the following bank account:</p>
          <p><strong>Bank Name:</strong> XYZ Bank</p>
          <p><strong>Account Number:</strong> 1234567890</p>
          <p><strong>IBAN:</strong> TR00 1234 5678 9012 3456 7890 12</p>
          <p><strong>Account Holder:</strong> John Doe</p>
        </div>
      )}

      <button type="submit" disabled={loading || !stripe} className="btn-submit">
        {loading ? "Processing..." : `Pay $${totalAmount}`}
      </button>
      {error && <div className="error">{error}</div>}
      {paymentStatus === 'succeeded' && <div className="success">Payment successful!</div>}
    </form>
  );
};

export default CheckoutForm;

// Sipariş takibi için rastgele bir takip numarası oluşturma fonksiyonu
const generateTrackingId = () => {
  return 'TRK' + Math.floor(Math.random() * 1000000);
};
