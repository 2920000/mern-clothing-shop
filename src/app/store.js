import { configureStore } from "@reduxjs/toolkit";
import { productDetailApi } from "../services/detailProductApi";
import { cartProductsApi } from "../services/cartProductsApi";
import accountSlice from "../features/accountSlice";
import cartSlice from "../features/cartSlice";
import collectionSlice from "../features/collectionSlice";
import searchSlice from "../features/searchSlice";
import userSlice from "../features/userSlice";
import checkoutSlice from "../features/checkoutSlice";
import { orderedApi } from "../services/orderedApi";
import reviewSlice from "../features/reviewSlice";

const store = configureStore({
  reducer: {
    [productDetailApi.reducerPath]: productDetailApi.reducer,
    [cartProductsApi.reducerPath]: cartProductsApi.reducer,
    [orderedApi.reducerPath]: orderedApi.reducer,
    collection: collectionSlice,
    search: searchSlice,
    cart: cartSlice,
    account: accountSlice,
    user: userSlice,
    checkout: checkoutSlice,
    review:reviewSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(productDetailApi.middleware)
      .concat(orderedApi.middleware)
      .concat(cartProductsApi.middleware),
});

export default store;
