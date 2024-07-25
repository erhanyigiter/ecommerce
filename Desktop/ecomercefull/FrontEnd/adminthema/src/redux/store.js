import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import usersReducer from './userSlice';
import productsReducer from './productsSlice';
import totalProductsReducer from './totalProductSlice';

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    users: usersReducer,
    products: productsReducer,
    totalProducts: totalProductsReducer,
  },
});
