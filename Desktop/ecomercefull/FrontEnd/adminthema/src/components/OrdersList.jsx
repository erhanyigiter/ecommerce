import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../redux/ordersSlice';

const OrdersList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="orders-list">
      <h2>Order Management</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Shipping Address</th>
            <th>Payment Method</th>
            <th>Payment Status</th>
            <th>Status</th>
            <th>Tracking ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.orderDate).toLocaleString()}</td>
              <td>{order.shippingAddress}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.paymentStatus}</td>
              <td>{order.orderStatus}</td>
              <td>{order.trackingId}</td>
              <td>
                <Link to={`/order-management/${order.id}`} className="btn btn-primary">View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
