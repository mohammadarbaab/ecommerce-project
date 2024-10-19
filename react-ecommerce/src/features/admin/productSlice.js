import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilters,
  fetchBrands,
  fetchCategories,
  fetchProductById,
} from "./productApi";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  selectedProduct:null,
  status: "idle",
};
export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async (amount) => {
    const response = await fetchAllProducts(amount);

    return response.data;
  }
);

export const fetchAllProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);

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
  async ({ filter, sort }) => {
    try {
      const response = await fetchProductsByFilters(filter, sort);
      console.log("Thunk Response:", response);
      return response.data;
    } catch (error) {
      console.error("Thunk Error:", error);
      return [];
    }
  }
);

// CREATE A THUNKFOR categeories
export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async (amount) => {
    const response = await fetchCategories(amount);

    return response.data;
  }
);

// CREATE A THUNK FOR BRANDS
export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async (amount) => {
    const response = await fetchBrands(amount);

    return response.data;
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
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = [...state.categories, ...action.payload];
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = [...state.brands, ...action.payload];
      })
      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;
