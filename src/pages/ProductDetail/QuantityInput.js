import React, { forwardRef, useEffect } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { UPDATE_PRODUCTS_IN_CART } from "../../features/cartSlice";
import addProductToLocal from "../../helper/addProductToLocal";
import { qsa } from "../../helper/handleDOM";
import updateQuantity from "../../helper/updateQuantity";

const QuantityInput = forwardRef((props, ref) => {
  const {
    arrowUp = "",
    arrowDown = "",
    wrapper = "",
    shouldUpdateQuantityToLocal = false,
    cartProduct,
  } = props;
  const dispatch = useDispatch();
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
      }
    });
  };

  const handleIncrease = (e) => {
    handleNumberByArrow(e, 1);
    if (shouldUpdateQuantityToLocal) {
      dispatch(
        UPDATE_PRODUCTS_IN_CART(
          updateQuantity(cartProduct.productId, cartProduct.size, 1)
        )
      );
    }
  };

  const handleDescrease = (e) => {
    handleNumberByArrow(e, -1);
    if (shouldUpdateQuantityToLocal) {
      dispatch(
        UPDATE_PRODUCTS_IN_CART(
          updateQuantity(cartProduct.productId, cartProduct.size, -1)
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
        value={cartProduct?.amount || 1}
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
