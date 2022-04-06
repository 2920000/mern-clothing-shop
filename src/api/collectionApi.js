import instance from "./axiosClient";

const getProductsByCollection = (payload) => {
    const collection = payload.params.collection;
    const query = payload.query;
    return instance.get(`/products/collection/${collection}`, {
      params: {
        ...query,
      },
    });
  };

export {getProductsByCollection}