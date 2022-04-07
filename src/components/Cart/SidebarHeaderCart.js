import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  allCartProductsSelector,
  OPEN_CART_SIDEBAR,
} from "../../features/cartSlice";
import { convertToPrice } from "../../helper/converToPrice";

const SidebarHeaderCart = () => {
  const dispatch = useDispatch();
  const allCartProducts = useSelector(allCartProductsSelector);
  const [amount, setAmount] = useState();

  useEffect(() => {
    let amount = 0;
    for (let i = 0; i < allCartProducts?.length; i++) {
      amount = Number(amount) + Number(allCartProducts[i]?.amount);
    }
    setAmount(amount);
  });

  return (
    <div
      className={`flex items-center  text-3xl py-2 ${
        !allCartProducts ? "flex justify-end" : ""
      } `}
    >
      {allCartProducts && (
        <p className="text-[13px] flex-grow text-center">
          Giỏ hàng ({convertToPrice(amount)})
        </p>
      )}
      <IoClose
        className={`${
          allCartProducts ? "absolute" : "relative"
        } right-1 cursor-pointer`}
        onClick={() => {
          dispatch(OPEN_CART_SIDEBAR(false));
        }}
      />
    </div>
  );
};

export default SidebarHeaderCart;
