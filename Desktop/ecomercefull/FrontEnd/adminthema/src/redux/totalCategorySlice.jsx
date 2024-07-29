
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asenkron işlevle kategorilerin toplam sayısını getirir
export const fetchTotalCategories = createAsyncThunk(
  'totalCategory/fetchTotalCategories',
  async () => {
    const response = await axios.get('http://localhost:5220/api/Categories/total'); // API endpoint'i
    return response.data;
  }
);

const totalCategorySlice = createSlice({
    name: 'totalProduct',
    initialState: {
      total: 0,
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchTotalCategories.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTotalCategories.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.total = action.payload;
        })
        .addCase(fetchTotalCategories.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });

export default totalCategorySlice.reducer;
