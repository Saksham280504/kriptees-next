import { createSlice } from '@reduxjs/toolkit';

// 1. Create Order Slice
const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState: { loading: false, order: null, error: null },
  reducers: {
    createOrderRequest: (state) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// 2. My Orders Slice
const myOrderSlice = createSlice({
  name: 'myOrders',
  initialState: { orders: [], loading: false, error: null },
  reducers: {
    myOrderRequest: (state) => {
      state.loading = true;
    },
    myOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    myOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// 3. Order Details Slice
const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: { order: {}, loading: false, error: null, success: false },
  reducers: {
    orderDetailsRequest: (state) => {
      state.loading = true;
      state.success = false;
    },
    orderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.success = true;
    },
    orderDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// 4. All Orders Slice
const allOrdersSlice = createSlice({
  name: 'allOrders',
  initialState: { orders: [], loading: false, error: null },
  reducers: {
    allOrdersRequest: (state) => {
      state.loading = true;
    },
    allOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    allOrdersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// 5. Order Tracking Slice
const orderTrackingSlice = createSlice({
  name: 'orderTracking',
  initialState: { trackingDetails: {}, loading: false, error: null },
  reducers: {
    trackOrderRequest: (state) => {
      state.loading = true;
    },
    trackOrderSuccess: (state, action) => {
      state.loading = false;
      state.trackingDetails = action.payload;
    },
    trackOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

// 6. Delete / Update Order Slice
const deleteUpdateOrderSlice = createSlice({
  name: 'deleteUpdateOrder',
  initialState: { loading: false, isDeleted: false, isUpdated: false, error: null },
  reducers: {
    deleteOrderRequest: (state) => {
      state.loading = true;
    },
    deleteOrderSuccess: (state) => {
      state.loading = false;
      state.isDeleted = true;
    },
    deleteOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOrderReset: (state) => {
      state.isDeleted = false;
    },

    updateOrderRequest: (state) => {
      state.loading = true;
    },
    updateOrderSuccess: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    updateOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderReset: (state) => {
      state.isUpdated = false;
    },

    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
} = newOrderSlice.actions;

export const {
  myOrderRequest,
  myOrderSuccess,
  myOrderFail,
} = myOrderSlice.actions;

export const {
  orderDetailsRequest,
  orderDetailsSuccess,
  orderDetailsFail,
} = orderDetailsSlice.actions;

export const {
  allOrdersRequest,
  allOrdersSuccess,
  allOrdersFail,
} = allOrdersSlice.actions;

export const {
  trackOrderRequest,
  trackOrderSuccess,
  trackOrderFail,
} = orderTrackingSlice.actions;

export const {
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFail,
  deleteOrderReset,
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFail,
  updateOrderReset,
} = deleteUpdateOrderSlice.actions;

// Common action
export const {
  clearErrors: clearOrderErrors,
} = newOrderSlice.actions; // also exists in all other slices

// Export reducers
export const newOrderReducer = newOrderSlice.reducer;
export const myOrderReducer = myOrderSlice.reducer;
export const orderDetialsReducer = orderDetailsSlice.reducer;
export const allOrdersReducer = allOrdersSlice.reducer;
export const orderTrackingReducer = orderTrackingSlice.reducer;
export const deletUpdateOrderReducer = deleteUpdateOrderSlice.reducer;
