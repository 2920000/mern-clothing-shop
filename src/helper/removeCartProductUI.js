import { addLocalStorage } from "./localStoragefunction";
const {UPDATE_PRODUCTS_IN_CART } = require("../features/cartSlice");

const removeCartProductUI = (allCartProducts, id, dispatch, local) => {
  const filterCartProduct = allCartProducts.filter(
    (product) => (product._id||product.id) !== id
  );
  local && addLocalStorage("cart", filterCartProduct);
  if (filterCartProduct.length === 0) {
    local && localStorage.removeItem("cart");
    dispatch(UPDATE_PRODUCTS_IN_CART(null));
    return;
  }
  dispatch(UPDATE_PRODUCTS_IN_CART(filterCartProduct));
};

export default removeCartProductUI;
