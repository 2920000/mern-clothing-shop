import { addProductToMongodb } from "../api/cartApi";
import {OPEN_CART_SIDEBAR, UPDATE_PRODUCTS_IN_CART } from "../features/cartSlice";

const addProductToDatabase = async(
  productDetail,
  userId,
  dispatch,
  allCartProducts,
  productSize
) => {
  let amount = Number(document.querySelector("#number-input")?.value);
  let productData;
  productData = {
    productId: productDetail._id,
    image: productDetail.image,
    title: productDetail.title,
    price: productDetail.price,
    amount: amount || 1,
    sale: productDetail.sale,
    size: productSize,
  };
 
  const allProductsAfterAdded=await addProductToMongodb({ productData, userId })
   
  const checkProductExist = allCartProducts?.every(
    (product) => product.productId !== productDetail._id
  );
  const checkSizeExisting = allCartProducts?.some(
    (product) =>
      product.productId === productDetail._id && product.size === productSize
  );

  if (allCartProducts) {
    const newArray = allCartProducts?.map((product) => {
      const productCopy={...product}
      if (
        productCopy.productId === productDetail._id &&
        productCopy.size === productSize
      ) {
        productCopy.amount = Number(productData.amount) + Number(product.amount);
      }
      return productCopy;
    });

    if (checkProductExist || !checkSizeExisting) {
     
      dispatch(
        UPDATE_PRODUCTS_IN_CART(allProductsAfterAdded)
      );
    } else {
      dispatch(UPDATE_PRODUCTS_IN_CART(newArray));
    }
  } else {
    dispatch(UPDATE_PRODUCTS_IN_CART([productData]));
  }

  dispatch(OPEN_CART_SIDEBAR())

};
export default addProductToDatabase;
