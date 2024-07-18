import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts } from './productApi';

const initialState = {
  products:[],
  status: 'idle',
};
export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async (amount) => {
    const response = await fetchAllProducts(amount);

    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      //this error where i stuck
      // .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.products += action.payload;
      // });
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = [...state.products, ...action.payload];
      });
      
  },
});

export const { increment} = productSlice.actions;

export const selectAllProducts=(state)=> state.product.products;


export default productSlice.reducer;
