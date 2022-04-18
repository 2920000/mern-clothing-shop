import { addProductToMongodb } from "../api/cartApi";

const addProductToDatabase = async (data) => {
  const { productDetailWantToBuy, userId } = data;
  const allProductsAfterAdded = await addProductToMongodb({
    productData:productDetailWantToBuy,
    userId,
  });
  return allProductsAfterAdded.cart;
};
export default addProductToDatabase;
