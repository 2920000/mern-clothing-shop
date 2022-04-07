import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const cartProductsApi = createApi({
  reducerPath: "cartProducts",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getCartProducts: builder.query({
      query: (userId) => `cart/get/${userId}`,
    }),
  }),
});
export const { useGetCartProductsQuery } = cartProductsApi;
