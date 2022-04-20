import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productDetailWantToBuy: {
    productId: "",
    image: "",
    title: "",
    slug:"",
    price: null,
    amount: 1,
    sale: null,
    size:'S',
  },
};
const productDetailWantToBuySlice = createSlice({
  name: "productDetailWantToBuy",
  initialState,
  reducers: {
    UPDATE_PRODUCT_DETAIL_WANT_TO_BUY: (state, action) => {
         state.productDetailWantToBuy={...state.productDetailWantToBuy,...action.payload}
    },
  },
});
export const producDetailtWantToBuySelecter = (state) =>
  state.productDetailWantToBuy.productDetailWantToBuy;
export const { UPDATE_PRODUCT_DETAIL_WANT_TO_BUY } = productDetailWantToBuySlice.actions;
export default productDetailWantToBuySlice.reducer;
