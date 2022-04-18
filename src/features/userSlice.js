import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getShippingInfor, updateShippingInfor } from "../api/userApi";

export const fetchShippingInfor = createAsyncThunk(
  "user/shippingInfor",
  async (userId) => {
    const response = await getShippingInfor(userId);
    return response;
  }
);
export const updateShippingInforToDatabase = createAsyncThunk(
  "user/updateShippingInfor",
  async (payload, thunkApi) => {
    try {
      const response = await updateShippingInfor({ ...payload });
      thunkApi.dispatch(fetchShippingInfor(payload.userId));
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);
const initialState = {
  shippingInfor: null,
  shouldUpdateShippingInfor: false,
  isUpdateShippingInfor: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateShippingInforToDatabase.pending, (state, action) => {
      state.isUpdateShippingInfor = true;
    });
    builder.addCase(
      updateShippingInforToDatabase.fulfilled,
      (state, action) => {
        state.isUpdateShippingInfor = false;
      }
    );
    builder.addCase(fetchShippingInfor.fulfilled, (state, action) => {
      state.shippingInfor = action.payload;
      if (Object.keys(action.payload).length === 1) {
        state.shouldUpdateShippingInfor = true;
      } else {
        state.shouldUpdateShippingInfor = false;
      }
      state.isUpdateShippingInfor = false;
    });
  },
});
export default userSlice.reducer;

export const shouldUpdateShippingInforSelector = (state) =>
  state.user.shouldUpdateShippingInfor;
export const shippingInforSelector = (state) => state.user.shippingInfor;
export const isUpdateShippingInforSelector = (state) =>
  state.user.isUpdateShippingInfor;
