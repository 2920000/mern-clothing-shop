import { caculateSale } from "./caculateSale";
import { convertToPrice } from "./converToPrice";

export const moneyTotal = (allCartProducts) => {
    let initialValue = 0;
     const total= allCartProducts.reduce((preValue, curProduct) => {
      const amount = curProduct.amount;
      if (curProduct.sale !== 0) {
        return preValue + caculateSale(curProduct);
      }
      return preValue + curProduct?.price * amount;
    }, initialValue);
    return (total)
  };
  