import { addProductToMongodb } from "../api/cartApi";
import { CHANGE_PRODUCTS_IN_CART, OPEN_CART_SIDEBAR } from "../features/cartSlice";

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
        CHANGE_PRODUCTS_IN_CART(allProductsAfterAdded)
      );
    } else {
      dispatch(CHANGE_PRODUCTS_IN_CART(newArray));
    }
  } else {
    dispatch(CHANGE_PRODUCTS_IN_CART([productData]));
  }

  dispatch(OPEN_CART_SIDEBAR(true))

};
export default addProductToDatabase;
