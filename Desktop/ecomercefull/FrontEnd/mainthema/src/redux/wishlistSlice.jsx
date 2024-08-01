import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URL
const API_URL = "http://localhost:5220/api/Wishlist";

// Async thunk for fetching the wishlist items
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for adding an item to the cart from the wishlist
export const addItemToCart = createAsyncThunk(
  "wishlist/addItemToCart",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5220/api/ShoppingCarts", {
        productId: product.id,
        quantity: 1,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for removing an item from the wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/${product.id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wishlistItems = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        // Optionally handle cart addition success
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.id !== action.payload.id
        );
      });
  },
});

export default wishlistSlice.reducer;
