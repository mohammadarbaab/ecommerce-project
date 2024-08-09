import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser } from './authApi';

const initialState = {
  loggedInUser: null,
  status: 'idle'
};
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);

    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      });
  },
});

export const selectLoggedInUser=(state)=>state.auth.loggedInUser
export const { increment} = authSlice.actions;


export default authSlice.reducer;
