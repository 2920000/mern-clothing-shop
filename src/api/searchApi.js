import instance from "./axiosClient";

const getProductBySearch = async(query) => {
  return instance.get("/products/search", {
    params: {
      query,
    },
  });
};
export { getProductBySearch };
