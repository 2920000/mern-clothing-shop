import { addLocalStorage, getLocalStorage } from "./localStoragefunction";
import { v4 as uuid } from "uuid";
const addProductToLocal = (data) => {
  const { productDetailWantToBuy } = data;

  const productWantToBuyId = productDetailWantToBuy.productId;
  const productWantToBuySize = productDetailWantToBuy.size;
  const productData = {
    id: uuid(),
    ...productDetailWantToBuy,
  };
  const cartDataFromLocalStorage = getLocalStorage("cart");

  if (!cartDataFromLocalStorage) {
    addLocalStorage("cart", [productData]);
    return [productData];
  }
  const isSizeExisting = cartDataFromLocalStorage.some(
    (product) =>
      product.productId === productWantToBuyId &&
      product.size === productWantToBuySize
  );

  if (!isSizeExisting) {
    addLocalStorage("cart", [productData, ...cartDataFromLocalStorage]);
    return [productData, ...cartDataFromLocalStorage];
  } else {
    const newArray = cartDataFromLocalStorage?.map((product) => {
      if (
        product.productId === productWantToBuyId &&
        product.size === productWantToBuySize
      ) {
        product.amount = Number(productData.amount) + Number(product.amount);
      }
      return product;
    });
    addLocalStorage("cart", newArray);
    return newArray;
  }
};

export default addProductToLocal;
