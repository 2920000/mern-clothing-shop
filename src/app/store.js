import { configureStore } from "@reduxjs/toolkit";
import { productDetailApi } from "../services/detailProductApi";
import { cartProductsApi } from "../services/cartProductsApi";
import accountSlice from "../features/accountSlice";
import cartSlice from "../features/cartSlice";
import collectionSlice from "../features/collectionSlice";
import userSlice from "../features/userSlice";
import checkoutSlice from "../features/checkoutSlice";
import { orderedApi } from "../services/orderedApi";
import ratingSlice from "../features/ratingSlice";
import productDetailWantToBySlice from "../features/productDetailWantToBySlice";
import headerSlice from "../features/headerSlice";
import {productsListApi } from "../services/productsListApi";

const store = configureStore({
  reducer: {
    [productDetailApi.reducerPath]: productDetailApi.reducer,
    [cartProductsApi.reducerPath]: cartProductsApi.reducer,
    [orderedApi.reducerPath]: orderedApi.reducer,
    [productsListApi.reducerPath]: productsListApi.reducer,
    collection: collectionSlice,
    header: headerSlice,
    cart: cartSlice,
    account: accountSlice,
    user: userSlice,
    checkout: checkoutSlice,
    review: ratingSlice,
    productDetailWantToBuy: productDetailWantToBySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(productDetailApi.middleware)
      .concat(orderedApi.middleware)
      .concat(cartProductsApi.middleware)
      .concat(productDetailApi.middleware),

});

export default store;
