import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categoriesSlice';
import productsReducer from './productsSlice';
import shoppingCartReducer from './shoppingCartSlice';
import wishlistReducer from './wishlistSlice';

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    shoppingCart: shoppingCartReducer,
    wishlist: wishlistReducer,

  },
});
