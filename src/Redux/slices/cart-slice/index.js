import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/v1';

export const sendOrder = createAsyncThunk('cart/sendOrder', async ({ orderArray, token }, thunkAPI) => {
  try {
    const response = await axios.put(`${API_URL}/order`, JSON.stringify(orderArray), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchProducts = createAsyncThunk('cart/fetchProducts', async (token, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  value: [],
  productPending: false,
  productFailed: false,
  productSuccessful: false,
  orderPending: false,
  orderFailed: false,
  orderSuccessful: false,
  orderArray: [],
};

const cartReducer = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      state.value = state.value.filter((item) => item.name !== action.payload.name);
    },
    addToCart: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    updateCart: (state, action) => {
      state.value = action.payload;
    },
    decrementQuantity: (state, action) => {
      state.value = state.value.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
    incrementQuantity: (state, action) => {
      state.value = state.value.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    decrementAvailableQuantity: (state, action) => {
      state.value = state.value.map((item) => {
        if (item.key === action.payload.key) {
          return { ...item, availableQuantity: item.availableQuantity - 1 };
        }
        return item;
      });
    },
    incrementAvailableQuantity: (state, action) => {
      state.value = state.value.map((item) => {
        if (item.key === action.payload.key) {
          return { ...item, availableQuantity: item.availableQuantity + 1 };
        }
        return item;
      });
    },
    resetOrderStatus: (state) => {
      state.orderPending = false;
      state.orderFailed = false;
      state.orderSuccessful = false;
    },
    setOrderArray: (state, action) => {
      state.orderArray = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.orderPending = true;
        state.orderFailed = false;
        state.orderSuccessful = false;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.orderPending = false;
        state.orderFailed = false;
        state.orderSuccessful = true;
      })
      .addCase(sendOrder.rejected, (state) => {
        state.orderPending = false;
        state.orderFailed = true;
        state.orderSuccessful = false;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.productPending = true;
        state.productFailed = false;
        state.productSuccessful = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productPending = false;
        state.productFailed = false;
        state.productSuccessful = true;
        state.value = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.productPending = false;
        state.productFailed = true;
        state.productSuccessful = false;
      });
  },
});

export const {
  removeFromCart,
  addToCart,
  updateCart,
  decrementQuantity,
  incrementQuantity,
  decrementAvailableQuantity,
  incrementAvailableQuantity,
  resetOrderStatus,
  setOrderArray,
} = cartReducer.actions;
export default cartReducer.reducer;
