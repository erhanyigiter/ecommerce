import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import productsReducer from './productsSlice';
import shoppingCartReducer from './shoppingCartSlice';
import wishlistReducer from './wishlistSlice';
import paymentSliceReducer from './paymentSlice';
import orderSlice from './orderSlice';

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    shoppingCart: shoppingCartReducer,
    wishlist: wishlistReducer,
    payment: paymentSliceReducer,
    orders: orderSlice,

  },
});
