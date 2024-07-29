import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:5220/api/Products';

// Async thunks
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const response = await axios.post(apiUrl, product, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
  const response = await axios.put(`${apiUrl}/${product.id}`, product, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  // Server-side'da ürünün IsDeleted durumunu true yapacak bir endpoint çağırıyoruz
  const response = await axios.delete(`${apiUrl}/${productId}`, null, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return productId; // productId'yi döndürüyoruz
});

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null
  },
  reducers: {
    setProductStatus: (state, action) => {
      const { id, isStatus } = action.payload;
      const existingProduct = state.products.find(product => product.id === id);
      if (existingProduct) {
        existingProduct.isStatus = isStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Yalnızca isDeleted = false olan ürünleri store'a ekleyin
        state.products = action.payload.filter(product => !product.isDeleted);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        // Silinen ürünü store'dan çıkarın
        state.products = state.products.filter(product => product.id !== action.payload);
      });
  },
});

// Export actions and reducer
export const { setProductStatus } = productsSlice.actions;
export default productsSlice.reducer;
