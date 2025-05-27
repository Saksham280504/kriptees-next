'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  deleteUpdateReducer,
  getALLReviewReducer,
  deleteReviewReducer,
} from './reducers/productReducers';

import {
  profileReducer,
  userReducer,
  forgetPasswordReducer,
  userDetailsReducer,
  allUsersReducer,
} from './reducers/userReducer';

import cartReducer from './reducers/cartReducer';

import {
  newOrderReducer,
  myOrderReducer,
  orderDetialsReducer,
  allOrdersReducer,
  deletUpdateOrderReducer,
  orderTrackingReducer,
} from './reducers/orderReducer';

import { wishlistReducer } from './reducers/wishlistReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  userData: userReducer,
  profileData: profileReducer,
  forgetPassword: forgetPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrder: myOrderReducer,
  orderDetails: orderDetialsReducer,
  addNewReview: newReviewReducer,
  addNewProduct: newProductReducer,
  deleteUpdateProduct: deleteUpdateReducer,
  allOrders: allOrdersReducer,
  deleteUpdateOrder: deletUpdateOrderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  deleteReview: deleteReviewReducer,
  getAllReview: getALLReviewReducer,
  orderTrack: orderTrackingReducer,
  wishlist: wishlistReducer,
});

const isClient = typeof window !== 'undefined';
const initialState = {
  cart: {
    cartItems: isClient && localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
    shippingInfo: isClient && localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : [],
  },
  wishlist: {
    wishlistItems: isClient && localStorage.getItem("wishlistItems")
      ? JSON.parse(localStorage.getItem("wishlistItems"))
      : [],
  },
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;
