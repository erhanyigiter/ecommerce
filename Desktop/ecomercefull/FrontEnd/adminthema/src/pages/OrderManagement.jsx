import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OrdersList from '../components/OrdersList';
import OrderDetails from '../components/OrderDetails';
const OrderManagement = () => {
  return (
    <div>
      <h2>Order Management</h2>
      <Routes>
        <Route path="/" element={<OrdersList />} />
        <Route path=":id" element={<OrderDetails />} />
      </Routes>
    </div>
  );
};

export default OrderManagement;
