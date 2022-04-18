import { createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../features/accountSlice";
import {
  OPEN_CART_SIDEBAR,
  UPDATE_PRODUCTS_IN_CART,
} from "../../../features/cartSlice";
import {
  producDetailtWantToBuySelecter,
  UPDATE_PRODUCT_DETAIL_WANT_TO_BUY,
} from "../../../features/productDetailWantToBySlice";
import {
  addCartProductToDatabase,
  addCartProductToLocal,
} from "../../../helper";

import QuantityInput from "../QuantityInput";

const ProductPurchase = ({ productDetail }) => {
  const user = useSelector(userSelector);
  const quantityRef = createRef();
  const dispatch = useDispatch();
  const productDetailWantToBuy = useSelector(producDetailtWantToBuySelecter);

  useEffect(() => {
    dispatch(
      UPDATE_PRODUCT_DETAIL_WANT_TO_BUY({
        productId: productDetail._id,
        image: productDetail.image,
        title: productDetail.title,
        price: productDetail.price,
        sale: productDetail.sale,
      })
    );
  }, [productDetail]);

  const handleAddProductToCart = async () => {
    if (user) {
      const data = {
        userId: user._id,
        productDetailWantToBuy,
      };
      const response = await addCartProductToDatabase(data);
      dispatch(UPDATE_PRODUCTS_IN_CART(response));
    } else {
      const data = {
        productDetailWantToBuy,
      };
      dispatch(UPDATE_PRODUCTS_IN_CART(addCartProductToLocal(data)));
    }

    dispatch(OPEN_CART_SIDEBAR());
  };

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
