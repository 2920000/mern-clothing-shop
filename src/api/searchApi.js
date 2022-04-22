import instance from "./axiosClient";

const searchApi = {
  fetch: async (query) => {
    return instance.get("/products/search", {
      params: {
        query,
      },
    });
  },
};
export default searchApi;
