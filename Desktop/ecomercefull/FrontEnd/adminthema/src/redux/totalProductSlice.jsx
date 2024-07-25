import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTotalProducts = createAsyncThunk(
  'totalProducts/fetchTotalProducts',
  async () => {
    const response = await axios.get('http://localhost:5220/api/Products/total'); // API endpoint'ini kontrol et
    return response.data;
  }
);

const totalProductSlice = createSlice({
  name: 'totalProducts',
  initialState: {
    total: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTotalProducts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTotalProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.total = action.payload;
      })
      .addCase(fetchTotalProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default totalProductSlice.reducer;
