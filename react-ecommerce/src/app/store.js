import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../productslist/productSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
