import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrder } from '../redux/orderSlice';
import { Button, Input, Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import TrackingIdDisplay from '../components/TrackingIdDisplay';

const OrderTrackingPage = () => {
  const dispatch = useDispatch();
  const { currentOrder, orderStatus, error } = useSelector((state) => state.orders || {});
  const [trackingId, setTrackingId] = useState('');
  const location = useLocation();

  useEffect(() => {
    // URL'den trackingId parametresini al
    const params = new URLSearchParams(location.search);
    const trackingIdFromUrl = params.get('trackingId');

    if (trackingIdFromUrl) {
      setTrackingId(trackingIdFromUrl);
      dispatch(fetchOrder(trackingIdFromUrl));
    }
  }, [dispatch, location.search]);

  const handleInputChange = (e) => {
    setTrackingId(e.target.value);
  };

  const handleTrackOrder = () => {
    if (trackingId) {
      dispatch(fetchOrder(trackingId));
    }
  };

  useEffect(() => {
    if (orderStatus === 'failed' && error) {
      toast.error(`Error: ${error}`);
    }
  }, [orderStatus, error]);

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2 className="text-center mb-4">Order Tracking</h2>
      <div className="d-flex justify-content-center mb-4">
        <Input
          type="text"
          value={trackingId}
          onChange={handleInputChange}
          placeholder="Enter tracking ID"
          className="mr-2"
        />
        <Button color="primary" onClick={handleTrackOrder}>Track Order</Button>
      </div>

      {orderStatus === 'loading' && <p className="text-center">Loading...</p>}
      {orderStatus === 'failed' && !currentOrder && <p className="text-center text-danger">No order found for this Tracking ID.</p>}
      {currentOrder && (
        <>
          <Card className="mt-4">
            <CardBody>
              <CardTitle tag="h3">Order Details</CardTitle>
              <p>Status: {currentOrder.orderStatus}</p>
              <p>Tracking ID: {currentOrder.trackingId}</p>
              <p>Payment Status: {currentOrder.paymentStatus}</p>
              <p>Shipping Address: {currentOrder.shippingAddress}</p>
              <h4>Items:</h4>
              <ListGroup>
                {currentOrder.orderItems.map((item) => (
                  <ListGroupItem key={item.id}>
                    {item.productName} - Quantity: {item.quantity} - Price: ${item.price}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </CardBody>
          </Card>

          {/* TrackingIdDisplay Bileşenini Ekle */}
          <TrackingIdDisplay trackingId={currentOrder.trackingId} />
        </>
      )}
    </div>
  );
};

export default OrderTrackingPage;
