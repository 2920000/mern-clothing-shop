import { addLocalStorage, getLocalStorage } from "./localStoragefunction";

const updateCartProductQuantityFromLocal = (productId, productSize, number = 0) => {
  const cartDataFromLocalStorage = getLocalStorage("cart");
  const cartDataFromLocalStorageAfterUpdated = cartDataFromLocalStorage.map(
    (productInLocal) => {
      if (
        productInLocal.productId === productId &&
        productInLocal.size === productSize
      ) {
        const quantityTotalAfterAdded = Number(productInLocal.amount) + number;
        productInLocal.amount =
          quantityTotalAfterAdded === 0
            ? productInLocal.amount
            : quantityTotalAfterAdded;
      }
      return productInLocal;
    }
  );
  addLocalStorage("cart", cartDataFromLocalStorageAfterUpdated);
  return cartDataFromLocalStorageAfterUpdated;
};
export default updateCartProductQuantityFromLocal;
