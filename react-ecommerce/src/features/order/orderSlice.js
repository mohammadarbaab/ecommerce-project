import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder,fetchAllOrders, updateOrder } from './orderApi';
import { counterSlice } from '../cart/cartSlice';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder:false,
  totalOrders:0
};
// we may need more info of current 
export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (amount) => {
    const response = await createOrder(amount);

    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  'order/updateOrder',
  async (amount) => {
    const response = await updateOrder(amount);

    return response.data;
  }
);


export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async (pagination) => {
    const response = await fetchAllOrders(pagination);

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
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders=action.payload.orders;
        state.totalOrders=action.payload.totalOrders
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.orders.findIndex(order=>order.id===action.payload.id);
        state.orders[index]=action.payload;
      });
  },
});

export const {resetOrder}=orderSlice.actions;
export const selectCurrentOrder= (state)=>state.order.currentOrder
export const selectOrders= (state)=>state.order.orders
export const selectTotalOrders= (state)=>state.order.totalOrders


export default orderSlice.reducer;
