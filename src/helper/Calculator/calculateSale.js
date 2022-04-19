 const calculateSale = (product) => {
    const salePrice = (product.sale * (product.price)) / 100;
    const newPrice = product.price - salePrice
    if(product.amount){
      return (newPrice*product.amount);
    }
    return (newPrice)
  };
  export default calculateSale