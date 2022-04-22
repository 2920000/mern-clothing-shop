import instance from "./axiosClient";

const cartApi = {
  add: async (payload) => {
    return await instance.post(`/cart/add`, {
      ...payload,
    });
  },
  fetch: async (userId) => {
    return instance.get(`/cart/get/${userId}`);
  },
  deleteOne: async (payload) => {
    return instance.post(`/cart/remove`, {
      payload,
    });
  },
  updateQuantity: async (payload) => {
    return instance.post(`/cart/update`, {
      payload,
    });
  },
  //sai
  deleteAll: async (userId) => {
    return instance.post("/cart/clearCart", {
      userId,
    });
  },
};

export default cartApi;
