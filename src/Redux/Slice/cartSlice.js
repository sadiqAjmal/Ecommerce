import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
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
  },
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export default cartReducer;
