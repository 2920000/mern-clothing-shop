import { calculateMoneyTotal, calculateSale } from "./Calculator";
import {
  convertPriceFilter,
  convertToPrice,
  convertToVietnamese,
} from "./Converter";
import {
  addCartProductToDatabase,
  addCartProductToLocal,
  deleteCartProductFromLocal,
  updateCartProductQuantityFromLocal,
} from "./CrudShoppingCart";
import { handleDOM, qs, qsa, addClass, removeClass } from "./DomUtilies";
import {
  removeWhiteSpaceAndLowerCase,
  removeVietnameseTones,
  replaceWhitespace,
  validateForm,
} from "./Others";
import {
  addLocalStorage,
  removeLocalStorage,
  getLocalStorage,
} from "./StorageUtilties";
export {
  calculateMoneyTotal,
  calculateSale,
  convertPriceFilter,
  convertToPrice,
  convertToVietnamese,
  addCartProductToDatabase,
  addCartProductToLocal,
  deleteCartProductFromLocal,
  updateCartProductQuantityFromLocal,
  handleDOM,
  qs,
  qsa,
  addClass,
  removeClass,
  removeWhiteSpaceAndLowerCase,
  removeVietnameseTones,
  replaceWhitespace,
  validateForm,
  addLocalStorage,
  removeLocalStorage,
  getLocalStorage,
};
