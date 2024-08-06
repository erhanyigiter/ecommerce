// paymentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CardElement } from '@stripe/react-stripe-js';

// Ödeme işlemini başlatan async thunk
export const initiatePayment = createAsyncThunk(
  'payment/initiatePayment',
  async ({ stripe, elements, amount }, { rejectWithValue }) => {
    try {
      // CardElement bileşenini elements nesnesinden alın
      const cardElement = elements.getElement(CardElement);

      // Stripe ile token oluşturma
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        throw new Error(error.message);
      }

      // Backend'e ödeme talebi gönderme
      const response = await axios.post('http://localhost:5220/api/payments/charge', {
        token: token.id,
        amount: amount * 100, // Cent cinsinden miktar
      });

      return response.data; // Ödeme başarılı, response data'yı döndür
    } catch (err) {
      console.error(err);
      // Hata durumunda detaylı hata mesajı döndürülür
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    loading: false,
    error: null,
    paymentStatus: null,
  },
  reducers: {
    resetPaymentStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.paymentStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.paymentStatus = null;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const { resetPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;
