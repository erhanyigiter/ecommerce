import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import usersReducer from './userSlice';
import productsReducer from './productsSlice';
import totalProductReducer from './totalProductSlice'; // Doğru import ettiğinizden emin olun

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    users: usersReducer,
    products: productsReducer,
    totalProduct: totalProductReducer, // İsimlendirmelerin tutarlı olduğuna dikkat edin
  },
});
