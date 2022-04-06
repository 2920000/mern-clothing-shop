import instance from "./axiosClient";

const getProductBySearch = (query) => {
  return instance.get("/products/search", {
    params: {
      query,
    },
  });
};
export { getProductBySearch };
