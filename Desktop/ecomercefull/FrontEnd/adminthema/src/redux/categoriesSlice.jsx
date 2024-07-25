import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:5220/api/Categories';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const addCategory = createAsyncThunk('categories/addCategory', async (category) => {
  const response = await axios.post(apiUrl, category);
  return response.data;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async (category) => {
  const response = await axios.put(`${apiUrl}/${category.id}`, category);
  return response.data;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
  return id;
});

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
        const index = state.categories.findIndex((category) => category.id === action.payload.id);
        state.categories[index] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category.id !== action.payload);
      });
  },
});

export default categoriesSlice.reducer;
