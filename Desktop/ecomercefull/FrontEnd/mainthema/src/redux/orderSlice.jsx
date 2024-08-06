import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5220/api/Orders';

const initialState = {
  orders: [],
  orderStatus: 'idle',
  error: null,
};

// Asenkron işlemler
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const fetchOrder = createAsyncThunk('orders/fetchOrder', async (orderId) => {
  const response = await axios.get(`${API_URL}/${orderId}`);
  return response.data;
});

export const createOrder = createAsyncThunk('orders/createOrder', async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
});

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({ orderId, status }) => {
  const response = await axios.put(`${API_URL}/${orderId}`, { orderStatus: status });
  return response.data;
});

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId) => {
  await axios.delete(`${API_URL}/${orderId}`);
  return orderId;
});

// Slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.orderStatus = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderStatus = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.orderStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { id, orderStatus } = action.payload;
        const existingOrder = state.orders.find((order) => order.id === id);
        if (existingOrder) {
          existingOrder.orderStatus = orderStatus;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      });
  },
});

export default ordersSlice.reducer;
