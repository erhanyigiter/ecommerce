import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTotalOrders = createAsyncThunk(
  'totalOrders/fetchTotalOrders',
  async () => {
    const response = await axios.get('http://localhost:5220/api/Orders/total'); // API endpoint'ini kontrol et
    return response.data;
  }
);

const totalOrdersSlice = createSlice({
  name: 'totalOrders',
  initialState: {
    total: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTotalOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTotalOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.total = action.payload;
      })
      .addCase(fetchTotalOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default totalOrdersSlice.reducer;
