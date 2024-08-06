import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5220/api/Orders';

const initialState = {
  orders: [],
  currentOrder: null,
  orderStatus: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// Asenkron işlemler
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const fetchOrder = createAsyncThunk('orders/fetchOrder', async (orderId, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({ orderId, orderStatus }, thunkAPI) => {
  try {
    // Yalnızca orderStatus güncelleniyor
    const response = await axios.patch(`${API_URL}/${orderId}/updateStatus`, {
      orderStatus: orderStatus
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
  }
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
        state.error = null; // Hata durumunu sıfırla
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.orderStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.orderStatus = 'loading';
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderStatus = 'succeeded';
        state.currentOrder = action.payload;
        state.error = null; // Hata durumunu sıfırla
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderStatus = 'failed';
        state.error = action.payload;
        state.currentOrder = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        state.currentOrder = updatedOrder;
        state.error = null; // Hata durumunu sıfırla
        // Eğer orders listesi içinde de güncelleme yapılması gerekiyorsa:
        const existingOrder = state.orders.find(order => order.id === updatedOrder.id);
        if (existingOrder) {
          existingOrder.orderStatus = updatedOrder.orderStatus;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
