import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearCartFromDatabase } from "../api/cartApi";
import { addOrders } from "../api/checkoutApi";

export const addOrdersToDatabase = createAsyncThunk(
  "checkout/addOrders",
  async (payload) => {
    const response = await addOrders(payload);
    if (response.status === 200) {
      clearCartFromDatabase(payload.userId);
    }
    return response.data;
  }
);
const initialState = {
  orders: null,
  shippingFee: 0,
  isOrder: false,
  orderStatus: false,
};
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SET_SHIPPING_FEE: (state, action) => {
      state.shippingFee = action.payload;
    },
    SET_ORDER_STATUS: (state, action) => {
      state.orderStatus = action.payload;
    },
    SET_LOADING: (state, action) => {
      state.isOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addOrdersToDatabase.pending, (state) => {
      state.isOrder = true;
    });
    builder.addCase(addOrdersToDatabase.fulfilled, (state) => {
      state.orderStatus = true;
      state.isOrder = false;
    });
  },
});
export const orderStatusSelector = (state) => state.checkout.orderStatus;
export const isOrderSelector = (state) => state.checkout.isOrder;
export const ordersSelector = (state) => state.checkout.orders;
export const shippingFeeSelector = (state) => state.checkout.shippingFee;
export const { SET_SHIPPING_FEE, SET_ORDER_STATUS,SET_LOADING } = checkoutSlice.actions;
export default checkoutSlice.reducer;
