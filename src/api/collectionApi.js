import instance from "./axiosClient";

const collectionApi = {
  fetchByCollection: async (payload) => {
    const collection = payload.pathParams.collection;
    const params = payload.queryParams;
    return instance.get(`/products/collection/${collection}`, {
      params,
    });
  },
  fetchAll: async () => {
    return instance.get("/products/all");
  },
};

export default collectionApi;
