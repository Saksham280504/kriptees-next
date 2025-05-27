import { createSlice } from '@reduxjs/toolkit';

const isClient = typeof window !== 'undefined';

const initialState = {
  cartItems: isClient && localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
  shippingInfo: isClient && localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isExist = state.cartItems.find(cartItem => cartItem.productId === item.productId);

      if (isExist) {
        state.cartItems = state.cartItems.map(cartItem =>
          cartItem.productId === item.productId ? item : cartItem
        );
      } else {
        state.cartItems.push(item);
      }
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.productId !== action.payload);
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    }
  }
});

export const { addToCart, removeCartItem, saveShippingInfo } = cartSlice.actions;

export default cartSlice.reducer;
