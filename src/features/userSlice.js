import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getShippingInfor } from "../api/userApi";

export const fetchShippingInfor = createAsyncThunk(
  "user/shippingInfor",
  async (userId) => {
    const response = await getShippingInfor(userId);
    return response.data;
  }
);
const initialState = {
  shippingInfor: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchShippingInfor.fulfilled, (state, action) => {
      state.shippingInfor = action.payload;
    });
  },
});
export default userSlice.reducer;

export const shippingInforSelector = (state) => state.user.shippingInfor;
