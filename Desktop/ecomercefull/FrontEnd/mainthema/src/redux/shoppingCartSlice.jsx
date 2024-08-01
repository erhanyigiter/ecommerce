import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  status: 'idle',
  error: null,
};

const API_URL = 'http://localhost:5220/api/ShoppingCarts';

// Asenkron işlemler
export const fetchShoppingCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addItemToCart = createAsyncThunk('cart/addItemToCart', async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
});

export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  await axios.delete(API_URL);
});

export const updateItemInCart = createAsyncThunk('cart/updateItemInCart', async ({ id, updatedItem }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedItem);
  return response.data;
});

// Slice
const shoppingCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Sadece frontend üzerinde yerel olarak çalışan reducerlar
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShoppingCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.totalQuantity = action.payload.length;
        state.totalPrice = action.payload.reduce((total, item) => total + item.product.price * item.quantity, 0);
      })
      .addCase(fetchShoppingCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.totalQuantity++;
        state.totalPrice += action.payload.product.price * action.payload.quantity;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        const id = action.payload;
        const item = state.items.find((item) => item.id === id);
        if (item) {
          state.totalPrice -= item.product.price * item.quantity;
          state.items = state.items.filter((item) => item.id !== id);
          state.totalQuantity--;
        }
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      })
      .addCase(updateItemInCart.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.items.findIndex((item) => item.id === updatedItem.id);
        if (index !== -1) {
          state.items[index] = updatedItem;
          state.totalPrice = state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
        }
      });
  },
});

export default shoppingCartSlice.reducer;