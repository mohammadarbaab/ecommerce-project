import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder } from './orderApi';
import { counterSlice } from '../cart/cartSlice';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder:false
};
// we may need more info of current 
export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (amount) => {
    const response = await createOrder(amount);

    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder:(state)=>{
      state.currentOrder=null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder=action.payload
      });
  },
});

export const {resetOrder}=orderSlice.actions;
export const selectCurrentOrder= (state)=>state.order.currentOrder


export default orderSlice.reducer;
