import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account } from "../api/accountApi";
import { getLocalStorage } from "../helper/StorageUtilties";

export const postAccount = createAsyncThunk(
  "postAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await account(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

const initialState = {
  user: getLocalStorage('profile'),
  errorMessage:'',
  isLoading:false,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    CLEAR_ERRORMESSAGE:(state,action)=>{
      state.errorMessage=action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postAccount.pending, (state, action) => {
      state.isLoading=true
    });
    builder.addCase(postAccount.fulfilled, (state, action) => {
      state.user = action.payload;
      state.errorMessage = '';
      state.isLoading=false
    });
    builder.addCase(postAccount.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.isLoading=false
    });
  },
});

export const errorMessageSelector = (state) => state.account.errorMessage;
export const userSelector = (state) => state.account.user;
export const isLoadingSelector = (state) => state.account.isLoading;
export const {CLEAR_ERRORMESSAGE}=accountSlice.actions
export default accountSlice.reducer;
