import calculateSale from "./calculateSale";

const calculateMoneyTotal = (allCartProducts) => {
  let initialValue = 0;
  const total = allCartProducts.reduce((preValue, curProduct) => {
    const amount = curProduct.amount;
    if (curProduct.sale !== 0) {
      return preValue + calculateSale(curProduct);
    }
    return preValue + curProduct?.price * amount;
  }, initialValue);
  return total;
};

export default calculateMoneyTotal;
