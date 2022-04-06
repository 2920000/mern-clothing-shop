import instance from "./axiosClient";

const createUser = (payload) => {
  return instance.post("/user/createUser", {
    payload,
  });
};
const updateShippingInfor = (payload) => {
  return instance.post("/user/updateShippingInfor", {
    payload,
  });
};
const getShippingInfor = (userId) => {
  return instance.get("/user/shippingInfor",{
    params:{
      userId
    }
  });
};

export { createUser, updateShippingInfor, getShippingInfor };
