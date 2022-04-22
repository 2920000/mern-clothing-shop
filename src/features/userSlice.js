import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

export const fetchShippingAddress = createAsyncThunk(
  "user/shippingInfor",
  async (userId, { dispatch }) => {
    try {
      const response = await userApi.fetchShippingAddress(userId);
      dispatch(CLOSE_SHIPPING_INFOR_MODAL());
      return response;
    } catch (error) {
      dispatch(OPEN_SHIPPING_INFOR_MODAL());
    }
  }
);

export const updateShippingInforToDatabase = createAsyncThunk(
  "user/updateShippingInfor",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await userApi.updateShippingAddress({ ...payload });
      dispatch(CLOSE_SHIPPING_INFOR_MODAL());
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
const initialState = {
  shippingInfor: null,
  hasShippingInfor: false,
  isUpdateShippingInfor: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    OPEN_SHIPPING_INFOR_MODAL: (state) => {
      state.hasShippingInfor = true;
    },
    CLOSE_SHIPPING_INFOR_MODAL: (state) => {
      state.hasShippingInfor = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updateShippingInforToDatabase.pending, (state, action) => {
      state.isUpdateShippingInfor = true;
    });
    builder.addCase(
      updateShippingInforToDatabase.fulfilled,
      (state, action) => {
        state.isUpdateShippingInfor = false;
        state.shippingInfor = action.payload;
      }
    );
    builder.addCase(fetchShippingAddress.fulfilled, (state, action) => {
      state.shippingInfor = action.payload;
    });
  },
});
export default userSlice.reducer;

export const hasShippingInforSelector = (state) => state.user.hasShippingInfor;
export const shippingInforSelector = (state) => state.user.shippingInfor;
export const isUpdateShippingInforSelector = (state) =>
  state.user.isUpdateShippingInfor;
export const { OPEN_SHIPPING_INFOR_MODAL, CLOSE_SHIPPING_INFOR_MODAL } =
  userSlice.actions;
