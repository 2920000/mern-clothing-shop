import { calculateMoneyTotal } from "./calculateMoneyTotal";
import { addLocalStorage } from "./localStoragefunction";
import { caculateSale } from "./caculateSale";
import { convertToPrice } from "./converToPrice";
import { removeLocalStorage } from "./localStoragefunction";
import addCartProductToDatabase from "./addCartProductToDatabase";
import addCartProductToLocal from "./addCartProductToLocal";
import convertPriceFilter from "./convertPriceFilter";
import convertToVietnamese from "./convertToVietnamese";
import handleDOM from "./handleDOM";
import removeVietnameseTones from "./removeVietnameseTones";
import removeWhiteSpaceAndLowerCase from "./removeWhiteSpace";
import deleteCartProductFromLocal from "./deleteCartProductFromLocal";
import { replaceWhitespace } from "./replaceWhitespace";
import validateForm from "./validateForm";
import updateCartProductQuantityFromLocal from "./updateCartProductQuantityFromLocal";
import { getLocalStorage } from "./localStoragefunction";
import openSearchHeader from "./openSearchHeader";
export {
  openSearchHeader,
  getLocalStorage,
  calculateMoneyTotal,
  addLocalStorage,
  caculateSale,
  convertToPrice,
  removeLocalStorage,
  removeVietnameseTones,
  removeWhiteSpaceAndLowerCase,
  replaceWhitespace,
  addCartProductToDatabase,
  addCartProductToLocal,
  convertPriceFilter,
  handleDOM,
  convertToVietnamese,
  validateForm,
  deleteCartProductFromLocal,
  updateCartProductQuantityFromLocal
};
