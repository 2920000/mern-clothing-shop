import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account } from "../api/accountApi";
import { getLocalStorage } from "../helper/localStoragefunction";

const postAccount = createAsyncThunk(
  "postAccount",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await account(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);


const initialState = {
  user: getLocalStorage('profile'),
  errorMessage: null,
  isLoad:false,
  cart:null
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
      state.isLoad=true
    });
    builder.addCase(postAccount.fulfilled, (state, action) => {
      state.user = action.payload;
      state.errorMessage = '';
      state.isLoad=false
    });
    builder.addCase(postAccount.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.isLoad=false
    });
  },
});

export { postAccount };
export const errorMessageSelector = (state) => state.account.errorMessage;
export const userSelector = (state) => state.account?.user;
export const loadSelector = (state) => state.account.isLoad;
export const {CLEAR_ERRORMESSAGE}=accountSlice.actions
export default accountSlice.reducer;
