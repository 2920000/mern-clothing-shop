function convertPriceFilter(str) {
  let price
  switch (str) {
    case "Dưới 600.000":
        price = '0,600000';
      break;
    case "Từ 600.000 - 1.200.000":
       price='600000,1200000'
      break;

    case "Trên 1.200.000":
        price = '1200000,100000000';
      break;

    default:
  }
  return  price
}
export default convertPriceFilter;
