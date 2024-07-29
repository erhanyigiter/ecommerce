import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import totalOrdersSlice from './totalOrdersSlice';
import usersReducer from './userSlice';
import productsReducer from './productsSlice';
import totalProductReducer from './totalProductSlice';
import totalCategoryReducer from './totalCategorySlice';
import totalUserReducer from './totalUserSlice';
export default configureStore({
  reducer: {
    categories: categoriesReducer,
    users: usersReducer,
    products: productsReducer,
    totalProduct: totalProductReducer,
    totalCategory: totalCategoryReducer,
    totalUser: totalUserReducer,
    totalOrders: totalOrdersSlice,

  },
});
