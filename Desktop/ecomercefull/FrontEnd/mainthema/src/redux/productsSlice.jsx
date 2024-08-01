import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async  ( __,{ getState }) => {
  const response = await axios.get('http://localhost:5220/api/Products');
  const categories = getState().categories.categories;
  const activeCategoryIds = categories.filter(c => c.isStatus).map(c => c.id); 
  // console.log('API Response:', response.data);

  // Sadece aktif ve silinmemiş ürünleri almak için filtreleme yapılır.
  return response.data.filter((product) =>
    product.isStatus === true &&
    product.isDeleted === false &&
    activeCategoryIds.includes(product.categoryId)
  );
});
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
