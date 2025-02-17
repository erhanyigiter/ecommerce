import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:5220/api/Categories';

// Kategorileri getirmek için thunk
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get(apiUrl);
    return response.data.filter(category => !category.isDeleted);
  }
);

// Kategori eklemek için thunk
export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (category) => {
    const response = await axios.post(apiUrl, category);
    return response.data;
  }
);

// Kategori güncellemek için thunk
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, ...category }) => {
    const response = await axios.put(`${apiUrl}/${id}`, category);
    return response.data;
  }
);

// Kategori silmek için thunk
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    return id;
  }
);

// Kategori durumu güncellemek için thunk
export const updateCategoryStatus = createAsyncThunk(
  'categories/updateCategoryStatus',
  async ({ id, isStatus }) => {
    const response = await axios.put(`${apiUrl}/${id}`, { isStatus });
    return { id, isStatus: response.data.isStatus };
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
      .addCase(updateCategoryStatus.fulfilled, (state, action) => {
        const { id, isStatus } = action.payload;
        const existingCategory = state.categories.find(category => category.id === id);
        if (existingCategory) {
          existingCategory.isStatus = isStatus;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category.id !== action.payload);
      });
  },
});

export default categoriesSlice.reducer;
