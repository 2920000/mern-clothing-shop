import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const orderedApi = createApi({
  reducerPath: "ordered",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getOrdered: builder.query({
      query: (userId) => `user/orders/${userId}`,
    })
  }),
});
export const { useGetOrderedQuery } = orderedApi;
