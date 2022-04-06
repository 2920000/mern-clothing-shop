export const convertToPrice = (price) => {
    if (!price) return;
    let priceString = price.toString();
    if (priceString.length === 5) {
      const x = priceString.slice(0, 2);
      priceString = `${x}.000`;
    } else if (priceString.length === 6) {
      const x = priceString.slice(0, 3);
      priceString = `${x}.000`;
    } else if (priceString.length === 7) {
      const x = priceString.slice(0, 1);
      const y = priceString.slice(1,4);
      priceString = `${x}.${y}.000`;
    } else if (priceString.length === 8) {
      const x = priceString.slice(0, 2);
      const y = priceString.slice(2,5);
      priceString = `${x}.${y}.000`;
    } else if (priceString.length === 9) {
      const x = priceString.slice(0, 3);
      const y = priceString.slice(3,6);
      priceString = `${x}.${y}.000`;
    }
    return priceString;
  };    