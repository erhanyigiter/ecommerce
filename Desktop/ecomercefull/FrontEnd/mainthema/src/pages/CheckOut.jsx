import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckOutForm';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { Card, CardBody, CardTitle } from 'reactstrap';

const stripePromise = loadStripe('pk_test_51PkWrJIWauXDMvpOTP6D32FaFEkOQiimoPNoTpbinAAk0e2B9ajKClEQmTvly73MEyKDnuZRhuUdXh97XMTJ4dje00ynkpDLss'); // Stripe Public Key

const CheckOut = () => {
  const location = useLocation();
  const { items, totalPrice } = location.state || { items: [], totalPrice: 0 };
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    addressLine1: '',
    addressLine2: '',
    country: 'United States',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const copyToClipboard = (cardDetails) => {
    navigator.clipboard.writeText(cardDetails);
    alertify.success("Card details copied to clipboard.");
  };

  return (
    <div className="container-fluid">
      <div className="row px-xl-5">
        <div className="col-lg-8">
          <h5 className="section-title position-relative text-uppercase mb-3">
            <span className="bg-secondary pr-3">Shipping Address</span>
          </h5>
          <div className="bg-light p-30 mb-5">
            <div className="row">
              <div className="col-md-6 form-group">
                <label>First Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="John"
                  name="firstName"
                  value={shippingAddress.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 form-group">
                <label>Last Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Doe"
                  name="lastName"
                  value={shippingAddress.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 form-group">
                <label>E-mail</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="example@email.com"
                  name="email"
                  value={shippingAddress.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 form-group">
                <label>Mobile No</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="+123 456 789"
                  name="mobileNo"
                  value={shippingAddress.mobileNo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 form-group">
                <label>Address Line 1</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="123 Street"
                  name="addressLine1"
                  value={shippingAddress.addressLine1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 form-group">
                <label>Address Line 2</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="123 Street"
                  name="addressLine2"
                  value={shippingAddress.addressLine2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 form-group">
                <label>Country</label>
                <select
                  className="custom-select"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                >
                  <option value="Turkey">Türkiye</option>
                  <option value="United States">United States</option>
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                </select>
              </div>
              <div className="col-md-6 form-group">
                <label>City</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="New York"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 form-group">
                <label>State</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="New York"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 form-group">
                <label>ZIP Code</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="123"
                  name="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <h5 className="section-title position-relative text-uppercase mb-3">
            <span className="bg-secondary pr-3">Order Total</span>
          </h5>
          <div className="bg-light p-30 mb-5">
            <div className="border-bottom">
              <h6 className="mb-3">Products</h6>
              {items.map((item, index) => (
                <div key={index} className="d-flex justify-content-between">
                  <div>
                    <img src={item.product.imageUrl} alt={item.product.name} style={{ width: '50px' }} />
                  </div>
                  <div>
                    <p>{item.product.name}</p>
                    <p>{item.product.description}</p>
                  </div>
                  <div>
                    <p>Quantity: {item.quantity}</p>
                    <p>${item.product.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-bottom pt-3 pb-2">
              <div className="d-flex justify-content-between mb-3">
                <h6>Subtotal</h6>
                <h6>${totalPrice}</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6 className="font-weight-medium">Shipping</h6>
                <h6 className="font-weight-medium">$Free</h6>
              </div>
            </div>
            <div className="pt-2">
              <div className="d-flex justify-content-between mt-2">
                <h5>Total</h5>
                <h5>${totalPrice + 0}</h5>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Payment</span>
            </h5>
            <div className="bg-light p-30">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  totalAmount={totalPrice}
                  shippingAddress={shippingAddress}
                  items={items}
                />
              </Elements>
              <div className="test-cards mt-4">
                <h6 className="mb-3">Use Test Card:</h6>
                <Card onClick={() => copyToClipboard('4000000000009995 | 01/29 | 123')}>
                  <CardBody>
                    <CardTitle tag="h6">Card Declined</CardTitle>
                    <p>4000 0000 0000 9995 | 01/29 | 123</p>
                  </CardBody>
                </Card>
                <Card onClick={() => copyToClipboard('4000000000000341 | 01/29 | 123')}>
                  <CardBody>
                    <CardTitle tag="h6">Fraudulent Transaction</CardTitle>
                    <p>4000 0000 0000 0341 | 01/29 | 123</p>
                  </CardBody>
                </Card>
                <Card onClick={() => copyToClipboard('4000002500003155 | 01/29 | 123')}>
                  <CardBody>
                    <CardTitle tag="h6">Insufficient Funds</CardTitle>
                    <p>4000 0025 0000 3155 | 01/29 | 123</p>
                  </CardBody>
                </Card>
                <Card onClick={() => copyToClipboard('4242424242424242 | 01/29 | 123')}>
                  <CardBody>
                    <CardTitle tag="h6">Successful Payment</CardTitle>
                    <p>4242 4242 4242 4242 | 01/29 | 123</p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
