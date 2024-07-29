import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Kategorileri getirmek için thunk
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get('http://localhost:5220/api/Categories');
    return response.data;
  }
);

// Kategori eklemek için thunk
export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (category) => {
    const response = await axios.post('http://localhost:5220/api/Categories', category);
    return response.data;
  }
);

// Kategori güncellemek için thunk
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, ...category }) => {
    const response = await axios.put(`http://localhost:5220/api/Categories/${id}`, category);
    return response.data;
  }
);

// Kategori silmek için thunk
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id) => {
    await axios.delete(`http://localhost:5220/api/Categories/${id}`);
    return id;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(category => category.id === action.payload.id);
        state.categories[index] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category.id !== action.payload);
      });
  },
});

export default categoriesSlice.reducer;
