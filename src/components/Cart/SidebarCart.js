import React, { useEffect, useRef } from "react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../features/accountSlice";
import {
  fetchCartDataFromDatabase,
  isOpenCartSidebarSelector,
  OPEN_CART_SIDEBAR,
} from "../../features/cartSlice";
import useClickOutside from "../../hooks/useClickOutside";
import ErrorBoundary from "../error-boundary";
import CartData from "./cart-data/CartData";
import EmptyCart from "./empty-cart/EmptyCart";

const SidebarCart = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const isOpen = useSelector(isOpenCartSidebarSelector);
  const cartSidebarRef = useRef();

  const unvisibleOverlay = {
    right: "100%",
    opacity: "0",
  };
  const visibleOverlay = {
    opacity: "1",
  };
  const visibleCart = {
    transform: "translateX(0)",
  };

  useClickOutside(cartSidebarRef, () => {
    dispatch(OPEN_CART_SIDEBAR(false));
  });

  useEffect(() => {
    if (user) {
      const userId = user._id;
      dispatch(fetchCartDataFromDatabase(userId));
    }
  }, [user]);

  useEffect(() => {
    return () => dispatch(OPEN_CART_SIDEBAR(false));
  }, []);

  return ReactDom.createPortal(
    <div
      style={isOpen ? visibleOverlay : unvisibleOverlay}
      className="fixed transition-[opacity] opacity-0 duration-500 top-0 z-20 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] "
    >
      <div
        style={isOpen ? visibleCart : {}}
        ref={cartSidebarRef}
        className="fixed flex-col justify-between items-center right-0 top-0  z-50  min-w-full md:min-w-[430px] md:max-w-[430px]  overflow-y-auto h-full bg-white transition-all duration-300 translate-x-[700px]"
      >
        <ErrorBoundary>
          <EmptyCart />
          <CartData />
        </ErrorBoundary>
      </div>
    </div>,
    document.getElementById("cart-sidebar")
  );
};

export default SidebarCart;
