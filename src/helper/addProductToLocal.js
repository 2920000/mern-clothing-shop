import { CHANGE_PRODUCTS_IN_CART, OPEN_CART_SIDEBAR } from "../features/cartSlice";
import { addLocalStorage, getLocalStorage } from "./localStoragefunction";
import { v4 as uuid } from "uuid";
const addProductToLocal = (productDetail, dispatch, productSize) => {
  const amount = Number(document.querySelector("#number-input")?.value);
  let productData;
  productData = {
    id: uuid(),
    productId: productDetail._id,
    image: productDetail.image,
    title: productDetail.title,
    price: productDetail.price,
    amount: amount || 1,
    sale: productDetail.sale,
    size: productSize,
  };
  const cartDataFromLocalStorage = getLocalStorage("cart");

  const checkProductExist = cartDataFromLocalStorage?.every(
    (product) => product.productId !== productDetail._id
  );
  const checkSizeExisting = cartDataFromLocalStorage?.some(
    (product) =>
      product.productId === productDetail._id && product.size === productSize
  );

  if (cartDataFromLocalStorage) {
    const newArray = cartDataFromLocalStorage?.map((product) => {
      if (
        product.productId === productDetail._id &&
        product.size === productSize
      ) {
        product.amount = Number(productData.amount) + Number(product.amount);
      }
      return product;
    });

    if (checkProductExist || !checkSizeExisting) {
      addLocalStorage("cart", [productData, ...cartDataFromLocalStorage]);
      dispatch(
        CHANGE_PRODUCTS_IN_CART([productData, ...cartDataFromLocalStorage])
      );
    } else {
      addLocalStorage("cart", newArray);
      dispatch(CHANGE_PRODUCTS_IN_CART(newArray));
    }
  } else {
    addLocalStorage("cart", [productData]);
    dispatch(CHANGE_PRODUCTS_IN_CART([productData]));
  }

  dispatch(OPEN_CART_SIDEBAR(true))
  
};

export default addProductToLocal;
