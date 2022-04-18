import React, { forwardRef } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { updateCartProductAmountFromDatabase } from "../../api/cartApi";
import { userSelector } from "../../features/accountSlice";
import { UPDATE_PRODUCTS_IN_CART } from "../../features/cartSlice";
import {
  producDetailtWantToBuySelecter,
  UPDATE_PRODUCT_DETAIL_WANT_TO_BUY,
} from "../../features/productDetailWantToBySlice";
import { updateCartProductQuantityFromLocal } from "../../helper";
import { qsa } from "../../helper/handleDOM";

const QuantityInput = forwardRef((props, ref) => {
  const {
    arrowUp = "",
    arrowDown = "",
    wrapper = "",
    shouldUpdateQuantityToLocal = false,
    shouldUpdateQuantityToDatabase = false,
    cartProduct,
  } = props;

  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const productDetailWantToBuy = useSelector(producDetailtWantToBuySelecter);
  const productQuantity = productDetailWantToBuy.amount;

  const handleNumberByArrow = (e, number = 0) => {
    const quantityBoxes = qsa(".product-quantity-box");
    quantityBoxes.forEach((quantityBox) => {
      if (quantityBox.contains(e.target)) {
        const quantityElement = quantityBox.querySelector(".number-input");
        const preQuantity = quantityElement.value;
        const quantityAfterAdded = Number(preQuantity) + number;
        if (quantityAfterAdded === 0) {
          return;
        }
        quantityElement.value = quantityAfterAdded;
        dispatch(UPDATE_PRODUCT_DETAIL_WANT_TO_BUY({amount:quantityAfterAdded}))
      }
    });
  };

  const handleIncrease = async (e) => {
    handleNumberByArrow(e, 1);
    if (shouldUpdateQuantityToLocal) {
      dispatch(
        UPDATE_PRODUCTS_IN_CART(
          updateCartProductQuantityFromLocal(
            cartProduct.productId,
            cartProduct.size,
            1
          )
        )
      );
    }

    if (shouldUpdateQuantityToDatabase) {
      dispatch(
        UPDATE_PRODUCTS_IN_CART(
          await updateCartProductsAmountDatabase(user, cartProduct, "plus")
        )
      );
    }
  };

  const handleDescrease = async (e) => {
    handleNumberByArrow(e, -1);
    if (shouldUpdateQuantityToLocal) {
      dispatch(
        UPDATE_PRODUCTS_IN_CART(
          updateCartProductQuantityFromLocal(
            cartProduct.productId,
            cartProduct.size,
            -1
          )
        )
      );
    }
    
    if (shouldUpdateQuantityToDatabase) {
      dispatch(
        UPDATE_PRODUCTS_IN_CART(
          await updateCartProductsAmountDatabase(user, cartProduct, "subtract")
        )
      );
    }
  };

  return (
    <div
      className={`product-quantity-box flex py-1 px-1.5  max-w-[65px] border border-border ${wrapper} `}
    >
      <input
        ref={ref}
        type="number"
        min={1}
        value={cartProduct?.amount || productQuantity}
        readOnly
        className="number-input text-center w-full outline-none"
      />
      <div className="flex flex-col justify-between">
        <div
          onClick={handleIncrease}
          className={`prev cursor-pointer hover:opacity-50 ${arrowUp} `}
        >
          <BsChevronUp />
        </div>
        <div
          onClick={handleDescrease}
          className={`next cursor-pointer hover:opacity-50 ${arrowDown}  `}
        >
          <BsChevronDown />
        </div>
      </div>
    </div>
  );
});

export default QuantityInput;

const updateCartProductsAmountDatabase = async (user, cartProduct, action) => {
  const payloadInsc = {
    userId: user._id,
    cartProduct,
    action,
  };
  const response = await updateCartProductAmountFromDatabase(payloadInsc);
  return response.cart;
};
