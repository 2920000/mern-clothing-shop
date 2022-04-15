import { memo } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { updateCartProductAmountFromDatabase } from "../../api/cartApi";
import {UPDATE_PRODUCTS_IN_CART } from "../../features/cartSlice";
import { addLocalStorage } from "../../helper/localStoragefunction";

const InputNumberBox = ({
  type,
  index,
  amount,
  product,
  user,
  allCartProducts,
}) => {
  const dispatch = useDispatch();
  const handleIncrease = () => {
    const value = document.querySelector(
      `#number-input${index + 1 || ""}`
    ).value;
    document.querySelector(`#number-input${index + 1 || ""}`).value =
      Number(value) + 1;
    if (type === "sidebar") {
      user?updateCartProductsAmountDatabase(
        user,
        product,
        allCartProducts,
        dispatch,
        "plus"
      ):updateCartProductsAmountLocal(product,allCartProducts,dispatch,"plus")
    }
  };

  const handleDescrease = () => {
    const value = document.querySelector(
      `#number-input${index + 1 || ""}`
    ).value;
    if (value > 1) {
      document.querySelector(`#number-input${index + 1 || ""}`).value =
        Number(value) - 1;
      if (type === "sidebar") {
        user?updateCartProductsAmountDatabase(
          user,
          product,
          allCartProducts,
          dispatch,
          "subtract"
        )
        :updateCartProductsAmountLocal(product,allCartProducts,dispatch,"subtract")
      }
    }
  };
  return (
    <div
      className={`number-box flex items-center h-full ${
        type === "sidebar" ? "" : "px-[5px]"
      }  `}
    >
      <input
        type="number"
        className={`number-input ${type === "sidebar" && "py-[4.5px]"}`}
        name="number"
        id={`number-input${index + 1 || ""}`}
        value={`${amount || "1"}`}
        min={1}
        readOnly
      />
      <div className="">
        <div
          onClick={handleIncrease}
          className={`prev cursor-pointer hover:opacity-50 ${
            type === "sidebar" ? "text-xs" : "mb-2"
          } `}
        >
          <BsChevronUp />
        </div>
        <div
          onClick={handleDescrease}
          className={`next cursor-pointer hover:opacity-50  ${
            type === "sidebar" && "text-xs"
          } `}
        >
          <BsChevronDown />
        </div>
      </div>
    </div>
  );
};

export default memo(InputNumberBox);

const updateCartProductsAmountDatabase = (
  user,
  product,
  allCartProducts,
  dispatch,
  action
) => {
  const payloadInsc = {
    userId: user._id,
    productId: product._id,
    action,
  };
  const newArray = allCartProducts?.map((p) => {
    const productCopy = { ...p };
    if (p._id === product._id) {
      productCopy.amount =
        action === "plus"
          ? Number(productCopy.amount) + 1
          : Number(productCopy.amount) - 1;
    }
    return productCopy;
  });
  dispatch(UPDATE_PRODUCTS_IN_CART(newArray));
  updateCartProductAmountFromDatabase(payloadInsc);
};


const updateCartProductsAmountLocal=(product,allCartProducts,dispatch,action)=>{
  const newArray = allCartProducts?.map((p) => {
    const productCopy = { ...p };
    if (p.id === product.id) {
      productCopy.amount =
        action === "plus"
          ? Number(productCopy.amount) + 1
          : Number(productCopy.amount) - 1;
    }
    return productCopy;
  })
  addLocalStorage('cart',newArray)
  dispatch(UPDATE_PRODUCTS_IN_CART(newArray));
}