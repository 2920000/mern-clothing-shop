import instance from "./axiosClient";

const addProductToMongodb = async (payload) => {
  const data = await instance.post(`/cart/add`, {
    payload,
  });
  return data.data;
};

const getCartFromDatabase = (userId) => {
  return instance.get(`/cart/get/${userId}`);
};

const removeCartProductFromDatabase = (payload) => {
  return instance.post(`/cart/remove`, {
    payload,
  });
};

const updateCartProductAmountFromDatabase = (payload) => {
  return instance.post(`/cart/update`, {
    payload,
  });
};

const clearCartFromDatabase=(userId)=>{
  return instance.post('/cart/clearCart',{
    userId
  })
}
export {
  addProductToMongodb,
  getCartFromDatabase,
  removeCartProductFromDatabase,
  updateCartProductAmountFromDatabase,
  clearCartFromDatabase
};
