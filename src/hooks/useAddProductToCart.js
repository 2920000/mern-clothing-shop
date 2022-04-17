import { useDispatch, useSelector } from "react-redux";
import { addProductToMongodb } from "../api/cartApi";
import { userSelector } from "../features/accountSlice";
import {
  allCartProductsSelector,
  UPDATE_PRODUCTS_IN_CART,
} from "../features/cartSlice";

const useAddProductToCart = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const allCartProducts = useSelector(allCartProductsSelector);
  let amount = Number(document.querySelector("#number-input")?.value);
  const userId = user._id;
  let productData;
  const add = async (productDetail, productSize) => {
    productData = {
      productId: productDetail._id,
      image: productDetail.image,
      title: productDetail.title,
      price: productDetail.price,
      amount: amount || 1,
      sale: productDetail.sale,
      size: productSize,
    };
    const allProductsAfterAdded = await addProductToMongodb({
      productData,
      userId,
    });
    const isProductExisting = allCartProducts?.some(
      (product) => product.productId === productDetail._id
    );

    const isSizeExisting = allCartProducts?.some(
      (product) =>
        product.productId === productDetail._id && product.size === productSize
    );

    const newArray = allCartProducts?.map((product) => {
        
      const productCopy = { ...product };
      if (
        productCopy.productId === productDetail._id &&
        productCopy.size === productSize
      ) {
        productCopy.amount =
          Number(productData.amount) + Number(product.amount);
      }
      return productCopy;
    });

    if (!isProductExisting || !isSizeExisting) {
      dispatch(UPDATE_PRODUCTS_IN_CART(allProductsAfterAdded));
    } else {
      dispatch(UPDATE_PRODUCTS_IN_CART(newArray));
    }
  };
  return { add };
};
export default useAddProductToCart;
