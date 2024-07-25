import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByFilters } from "./productApi";

const initialState = {
  products: [],
  status: "idle",
};
export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async (amount) => {
    const response = await fetchAllProducts(amount);

    return response.data;
  }
);

// export const fetchProductsByFilterAsync = createAsyncThunk(
//   "product/fetchProductsByFilters",
//   async (filter) => {
//     const response = await fetchProductsByFilters(filter );
//     // The value we return becomes the fullfilled action payload
//     return response.data;
//   }
// );

export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async (filter) => {
    try {
      const response = await fetchProductsByFilters(filter);
      console.log("Thunk Response:", response);
      return response.data;
    } catch (error) {
      console.error("Thunk Error:", error);
      return [];
    }
  }
);




export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      //this error where i stuck
      // .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   state.products += action.payload;
      // });
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = [...state.products, ...action.payload];
      })
      .addCase(fetchProductsByFilterAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;
