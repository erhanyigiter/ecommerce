import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrder, updateOrderStatus } from '../redux/ordersSlice';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useSnackbar } from 'notistack';

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { currentOrder, error, orderStatus } = useSelector((state) => state.orders);
  const [orderStatusValue, setOrderStatusValue] = useState('');

  useEffect(() => {
    dispatch(fetchOrder(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (currentOrder) {
      setOrderStatusValue(currentOrder.orderStatus || '');
    }
  }, [currentOrder]);

  const handleStatusChange = (e) => {
    setOrderStatusValue(e.target.value);
  };

  const handleStatusUpdate = () => {
    if (!orderStatusValue) {
      enqueueSnackbar('Order status must be selected', { variant: 'warning' });
      return;
    }

    dispatch(updateOrderStatus({ orderId, orderStatus: orderStatusValue }))
      .unwrap()
      .then(() => {
        enqueueSnackbar('Order status updated successfully', { variant: 'success' });
        navigate(-1); 
      })
      .catch((error) => {
        enqueueSnackbar(error.message || 'An error occurred while updating the order status.', { variant: 'error' });
      });
  };

  if (orderStatus === 'loading') {
    return <p>Loading...</p>;
  }

  if (error) {
    enqueueSnackbar(error.message || 'An error occurred while fetching the order details.', { variant: 'error' });
    return null;
  }

  if (!currentOrder) {
    return null;
  }

  return (
    <Container className="mt-4">
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {currentOrder.id}</p>
      <p><strong>Order Date:</strong> {new Date(currentOrder.orderDate).toLocaleString()}</p>
      <p><strong>Shipping Address:</strong> {currentOrder.shippingAddress}</p>
      <p><strong>Payment Method:</strong> {currentOrder.paymentMethod}</p>
      <p><strong>Payment Status:</strong> {currentOrder.paymentStatus}</p>
      <p><strong>Order Status:</strong> {currentOrder.orderStatus}</p>
      <p><strong>Tracking ID:</strong> {currentOrder.trackingId}</p>
      <p><strong>Total Amount:</strong> ${currentOrder.orderItems.reduce((total, item) => total + item.price, 0)}</p>

      <h4>Items:</h4>
      <ul>
        {currentOrder.orderItems.map((item) => (
          <li key={item.id}>
            {item.productName} - Quantity: {item.quantity} - Price: ${item.price}
          </li>
        ))}
      </ul>

      <Form className="mt-4">
        <FormGroup className="mr-2">
          <Label for="statusSelect" className="mr-2">Order Status</Label>
          <Input
            type="select"
            name="orderStatus"
            id="statusSelect"
            value={orderStatusValue}
            onChange={handleStatusChange}
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </Input>
        </FormGroup>
        <Button color="primary" onClick={handleStatusUpdate}>Update Status</Button>
      </Form>
    </Container>
  );
};

export default OrderDetails;
