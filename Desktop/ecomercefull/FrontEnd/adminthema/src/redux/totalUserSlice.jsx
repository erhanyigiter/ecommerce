import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTotalUsers = createAsyncThunk(
  'totalUser/fetchTotalUsers',
  async () => {
    const response = await axios.get('http://localhost:5220/api/Users/total'); // API endpoint'ini kontrol et
    return response.data;
  }
);

const totalUserSlice = createSlice({
  name: 'totalUser',
  initialState: {
    total: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTotalUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTotalUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.total = action.payload;
      })
      .addCase(fetchTotalUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default totalUserSlice.reducer;
