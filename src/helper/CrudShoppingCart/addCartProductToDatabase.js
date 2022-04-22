import cartApi from "../../api/cartApi";

const addCartProductToDatabase = async (data) => {
  const { productDetailWantToBuy, userId } = data;
  const allProductsAfterAdded = await cartApi.add({
    productData:productDetailWantToBuy,
    userId,
  });
  return allProductsAfterAdded.cart;
};
export default addCartProductToDatabase;
