import { configureStore } from '@reduxjs/toolkit';
import productRe

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
