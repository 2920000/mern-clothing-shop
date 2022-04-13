import instance from "./axiosClient";

const getProductsByCollection = (payload) => {
    const collection = payload.pathParams.collection;
    const params = payload.queryParams;
    return instance.get(`/products/collection/${collection}`, {
      params
    });
  };

export {getProductsByCollection}