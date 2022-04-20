import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productDetailApi = createApi({
  reducerPath: "productDetail",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getProductDetail: builder.query({
      query: (productId) => `products/detail/${productId}`,
    }),
    getRating:builder.query({
      query:(slug)=>`/rating/${slug}`
    })
  }),
});
export const { useGetProductDetailQuery,useGetRatingQuery } = productDetailApi;
