import { addLocalStorage, getLocalStorage } from "./localStoragefunction";
import { v4 as uuid } from "uuid";
const addProductToLocal = (productDetail, productSize, quantity) => {
  let productData;
  productData = {
    id: uuid(),
    productId: productDetail._id,
    image: productDetail.image,
    title: productDetail.title,
    price: productDetail.price,
    amount: quantity || 1,
    sale: productDetail.sale,
    size: productSize,
  };
  const cartDataFromLocalStorage = getLocalStorage("cart");

  const isProductExisting = cartDataFromLocalStorage?.some(
    (product) => product.productId === productDetail._id
  );
  const isSizeExisting = cartDataFromLocalStorage?.some(
    (product) =>
      product.productId === productDetail._id && product.size === productSize
  );

  if (!cartDataFromLocalStorage) {
    addLocalStorage("cart", [productData]);
    return [productData];
  }

  if (!isProductExisting || !isSizeExisting) {
    addLocalStorage("cart", [productData, ...cartDataFromLocalStorage]);
    return [productData, ...cartDataFromLocalStorage];
    
  } else {
    const newArray = cartDataFromLocalStorage?.map((product) => {
      if (
        product.productId === productDetail._id &&
        product.size === productSize
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
