import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartApi from "../api/cartApi";

export const fetchCart = createAsyncThunk(
  "fetchCartDataFromDatabase",
  async (userId) => {
    const response = await cartApi.fetch(userId);
    return response;
  }
);
const cartDataFromLocalStorage = JSON.parse(localStorage.getItem("cart"));

let cartAmount = 0;
for (let i = 0; i < cartDataFromLocalStorage?.length; i++) {
  cartAmount += cartDataFromLocalStorage[i].amount;
}

const initialState = {
  cartAmount,
  allCartProducts: cartDataFromLocalStorage,
  isLoading: false,
  isCartOpening: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    UPDATE_AMOUNT_CART_LOCALSTORAGE: (state, action) => {
      state.cartAmount = action.payload;
    },
    UPDATE_PRODUCTS_IN_CART: (state, action) => {
      state.allCartProducts = action.payload;
    },
    OPEN_CART_SIDEBAR: (state) => {
      state.isCartOpening = true;
    },
    CLOSE_CART_SIDEBAR: (state) => {
      state.isCartOpening = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.allCartProducts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCart.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const cartAmountSelector = (state) => state.cart.cartAmount;
export const allCartProductsSelector = (state) => state.cart.allCartProducts;
export const isCartOpeningSelector = (state) => state.cart.isCartOpening;
export const {
 UPDATE_AMOUNT_CART_LOCALSTORAGE,
 UPDATE_PRODUCTS_IN_CART,
 OPEN_CART_SIDEBAR,
 CLOSE_CART_SIDEBAR
} = cartSlice.actions;
export default cartSlice.reducer;
