import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productsListApi = createApi({
  reducerPath: "productsLists",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getProductsByTags: builder.query({
      query: (productId) => `products/tags/${productId}`,
    }),
  }),
});
export const { useGetProductsByTagsQuery } = productsListApi;
