import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLoggedInUser,
  fetchLoggedInUserOrders,
  updateUser,
} from "./userApi";

const initialState = {
  status: "idle",
  userOrders: [],
  // userInfo:null,
  userInfo: {
    addresses: [], // Initialize addresses as an empty array
    // Add other default user properties if necessary
  },
  value: 0,
};
export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "cart/fetchLoggedInUserOrders",
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);

    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "cart/fetchLoggedInUser",
  async (id) => {
    const response = await fetchLoggedInUser(id);

    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "cart/updateUserAsync",
  async (update) => {
    const response = await updateUser(update);

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
      })
      // .addCase(updateUserAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(updateUserAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   // this info can be different or more from loggedin user info
      //   state.userInfo = action.payload;
      // })
      // .addCase(fetchLoggedInUserAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   // this info can be different or more from loggedin user info
      //   state.userInfo = action.payload;
      // });
      // userSlice.js
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = {
          ...action.payload,
          addresses: action.payload.addresses || [], // Ensure addresses is always an array
        };
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = {
          ...action.payload,
          addresses: action.payload.addresses || [], // Ensure addresses is always an array
        };
      });
  },
});

export const { increment } = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
