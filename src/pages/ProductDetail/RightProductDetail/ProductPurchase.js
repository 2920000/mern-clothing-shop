import { createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../features/accountSlice";
import {
  allCartProductsSelector,
  OPEN_CART_SIDEBAR,
  UPDATE_PRODUCTS_IN_CART,
} from "../../../features/cartSlice";
import addProductToDatabase from "../../../helper/addProductToDatabase";
import addProductToLocal from "../../../helper/addProductToLocal";
import QuantityInput from "../QuantityInput";

const ProductPurchase = ({ productDetail, productSize }) => {
  const user = useSelector(userSelector);
  const allCartProducts = useSelector(allCartProductsSelector);
  const quantityRef = createRef();
  const dispatch = useDispatch();
  const handleAddProductToCart = () => {
    user
      ? addProductToDatabase(
          productDetail,
          user._id,
          dispatch,
          allCartProducts,
          productSize,
          quantityRef.current.value
        )
      : dispatch(
          UPDATE_PRODUCTS_IN_CART(
            addProductToLocal(
              productDetail,
              productSize,
              quantityRef.current.value
            )
          )
        );
    dispatch(OPEN_CART_SIDEBAR());
  };
  console.log("render");
  return (
    <div className="flex mt-5">
      <QuantityInput ref={quantityRef} />
      <div
        onClick={handleAddProductToCart}
        className="flex-grow py-2.5 ml-3 bg-black hover:bg-white hover:text-black cursor-pointer border border-black transition-all duration-150  text-white flex justify-center items-center text-lg font-bold"
      >
        Thêm vào giỏ hàng
      </div>
    </div>
  );
};

export default ProductPurchase;
