import instance from "./axiosClient";

const userApi = {
  addUser: async (payload) => {
    return instance.post("/user/createUser", {
      payload,
    });
  },
  updateShippingAddress: async (payload) => {
    return instance.post("/user/updateShippingInfor", {
      payload,
    });
  },
  fetchShippingAddress: async (userId) => {
    return instance.get("/user/shippingInfor", {
      params: {
        userId,
      },
    });
  },
};

export default userApi;
