import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLoggedInUserOrders
} from "./userApi";

const initialState = {
  status: "idle",
  userOrders: [],
  value: 0,
};
export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "cart/fetchLoggedInUserOrders",
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);

    return response.data;
  }
);

// export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
//   'cart/fetchLoggedInUserOrders',
//   async (userId, { rejectWithValue }) => {
//     try {
//       const orders = await fetchLoggedInUserOrders(userId);
//       return orders; // Return the orders data
//     } catch (error) {
//       // Handle errors and pass them to the rejected action
//       return rejectWithValue('Failed to fetch user orders');
//     }
//   }
// );
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // this info can be different or more from loggedin user info
        state.userOrders = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;

export const selectUserOrders=(state)=>state.user.userOrders

export default userSlice.reducer;
