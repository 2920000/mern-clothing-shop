import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  allCartProductsSelector,
  OPEN_CART_SIDEBAR,
} from "../../features/cartSlice";
import { openSearchHeader } from "../../helper";
import SidebarCart from "../Cart";
import ErrorBoundary from "../error-boundary/ErrorBoundary";

const HeaderRight = () => {
  const dispatch=useDispatch()
  const path = useLocation().pathname;
 

  if (path === "/checkout") {
    return <></>;
  }
  return (
    <div className="flex grow justify-end items-center max-w-[33.33%]">
      <IoIosSearch
        onClick={()=>openSearchHeader(true,dispatch)}
        className="text-[2rem]  cursor-pointer mr-5 block lg:hidden"
      />
      <CartIcon />
      <ErrorBoundary>
        <SidebarCart />
      </ErrorBoundary>
    </div>
  );
};
export default HeaderRight;

const CartIcon = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState();
  const allCartProducts = useSelector(allCartProductsSelector);
  const cartProductsLength = allCartProducts?.length;
  const isHaveProduct = cartProductsLength > 0;
  const handleShowCart = () => {
    dispatch(OPEN_CART_SIDEBAR(true));
  };
  useEffect(() => {
    if (isHaveProduct) {
      let amount = 0;
      for (let i = 0; i < cartProductsLength; i++) {
        amount = Number(amount) + Number(allCartProducts[i].amount);
      }
      setAmount(amount);
    }
  });
  return (
    <div>
      <div className="relative w-full h-full ">
        <BsCart3 onClick={handleShowCart} className="text-2xl cursor-pointer" />
        {isHaveProduct && (
          <div className="absolute flex items-center justify-center top-[-5px] right-[-5px] w-4 h-4 text-[0.6rem] text-white rounded-full bg-black">
            {amount}
          </div>
        )}
      </div>
    </div>
  );
};
