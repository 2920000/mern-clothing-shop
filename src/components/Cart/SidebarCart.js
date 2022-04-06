import React, { useEffect, useRef } from "react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  allCartProductsSelector,
  fetchCartDataFromDatabase,
  isOpenCartSidebarSelector,
  OPEN_CART_SIDEBAR,
} from "../../features/cartSlice";
import useClickOutside from "../../hooks/useClickOutside";
import CartData from "./CartData";
import SidebarHeaderCart from "./SidebarHeaderCart";
import EmptyCart from "./EmptyCart";
import { userSelector } from "../../features/accountSlice";

const SidebarCart = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(isOpenCartSidebarSelector);
  const cartSidebarRef = useRef();

  useClickOutside(cartSidebarRef, () => {
    dispatch(OPEN_CART_SIDEBAR(false));
  });

  return ReactDom.createPortal(
    <div
      style={!isOpen ? { right: "100%", opacity: "0" } : { opacity: "1" }}
      className="fixed transition-[opacity] opacity-0 duration-500 top-0 z-20 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] "
    >
      <div
        id="cart-sidebar-inner"
        style={isOpen ? { transform: "translateX(0)" } : {}}
        ref={cartSidebarRef}
        className="fixed flex-col justify-between items-center right-0 top-0  z-50  min-w-full md:min-w-[430px] md:max-w-[430px]  overflow-y-auto h-full bg-white transition-all duration-300 translate-x-[700px]"
      >
        <SidebarHeaderCart />
        <SidebarBodyCart />
      </div>
    </div>,
    document.getElementById("cart-sidebar")
  );
};

export default SidebarCart;

const SidebarBodyCart = () => {
  const dispatch=useDispatch()
  const allCartProducts = useSelector(allCartProductsSelector);
  const user = useSelector(userSelector);

  useEffect(() => {
    if (user) {
      const userId = user._id;
      dispatch(fetchCartDataFromDatabase(userId));
    }
  }, [user]);
  if (allCartProducts) {
    return <CartData />;
  }
  return <EmptyCart />;
};
