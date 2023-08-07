import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = 'http://localhost:5000/v1/order/fetchOrders';
export const getOrder = createAsyncThunk('order/getOrder', async ({skip,limit,token}, thunkAPI) => {
  try {
    const response = await axios.post(API_URL,{limit:limit,skip:skip}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
export const getAdminOrders = createAsyncThunk('/getAdminOrders', async ({skip,limit,token}, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:5000/v1/admin/get-orders',{limit:limit,skip:skip}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});
const orderInitialState = {
  Pending: false,
  Failed: false,
  Successful: false,
  Orders: [],
  count:0,
};
const getOrderSlice = createSlice({
  name: 'cart/order',
  initialState: orderInitialState,
  reducers: {
    resetOrderStatus: (state) => {
        state.Pending = false;
        state.Failed = false;
        state.Successful = false;
      },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getOrder.pending, (state) => {
        state.Pending = true;
        state.Failed = false;
        state.Successful = false;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.Pending = false;
        state.Failed = false;
        state.Successful = true;
        state.Orders = action.payload.orders;
        state.count=action.payload.count;
      })
      .addCase(getOrder.rejected, (state) => {
        state.Pending = false;
        state.Failed = true;
        state.Successful = false;
      }).addCase(getAdminOrders.pending, (state) => {
        state.Pending = true;
        state.Failed = false;
        state.Successful = false;
      })
      .addCase(getAdminOrders.fulfilled, (state, action) => {
        state.Pending = false;
        state.Failed = false;
        state.Successful = true;
        state.Orders = action.payload.orders;
        state.count=action.payload.count;
      })
      .addCase(getAdminOrders.rejected, (state) => {
        state.Pending = false;
        state.Failed = true;
        state.Successful = false;
      })
  },
});

export const {resetOrderStatus} = getOrderSlice.actions;
export default getOrderSlice.reducer;
