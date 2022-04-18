import { addProductToMongodb } from "../api/cartApi";

const addProductToDatabase = async (data) => {
  const { productDetail, userId, productSize, quantity } = data;
  let productData;
  productData = {
    productId: productDetail._id,
    image: productDetail.image,
    title: productDetail.title,
    price: productDetail.price,
    amount: quantity || 1,
    sale: productDetail.sale,
    size: productSize,
  };

  const allProductsAfterAdded = await addProductToMongodb({
    productData,
    userId,
  });
  return allProductsAfterAdded.cart;
};
export default addProductToDatabase;
