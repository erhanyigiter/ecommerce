import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createOrder } from "../redux/orderSlice";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import { Link } from "react-router-dom";

const CheckoutForm = ({ totalAmount, shippingAddress, items }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      alertify.error("Stripe has not loaded properly. Please try again.");
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        throw new Error(error.message);
      }

      const combinedAddress = `${shippingAddress.addressLine1}, ${shippingAddress.addressLine2}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zipCode}, ${shippingAddress.country}`;

      const orderData = {
        shippingAddress: combinedAddress,
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        orderStatus: 'Pending',
        trackingId: generateTrackingId(),
        orderItems: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          description: item.product.description,
          quantity: item.quantity,
          price: item.product.price,
        })),
      };

      const order = await dispatch(createOrder(orderData)).unwrap();
      setTrackingId(order.trackingId);
      alertify.success("Order created and payment successful!");
      
      // Yönlendirme
      navigate(`/order-tracking?trackingId=${order.trackingId}`);
    } catch (error) {
      alertify.error(error.message || "Payment failed. Please try again.");
    }
  };

  const generateTrackingId = () => {
    return 'TRK' + Math.floor(Math.random() * 1000000);
  };

  return (
    <div>
      {trackingId ? (
        <SuccessMessage trackingId={trackingId} />
      ) : (
        <form onSubmit={handleSubmit} className="checkout-form">
          <h4>Payment Details</h4>
          <div className="card-element-container">
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
          <button type="submit" disabled={!stripe} className="btn-submit">
            Pay ${totalAmount}
          </button>
        </form>
      )}
    </div>
  );
};

const SuccessMessage = ({ trackingId }) => (
  <div>
    <p>Your payment was successful! Your Tracking ID is: {trackingId}</p>
    <Link to={`/order-tracking?trackingId=${trackingId}`}>
      Track your order
    </Link>
  </div>
);

export default CheckoutForm;
