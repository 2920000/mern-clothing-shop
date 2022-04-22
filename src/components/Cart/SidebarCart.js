import React, { useEffect, useRef } from "react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../features/accountSlice";
import {
  CLOSE_CART_SIDEBAR,
  fetchCart,
  isCartOpeningSelector,
} from "../../features/cartSlice";
import useClickOutside from "../../hooks/useClickOutside";
import ErrorBoundary from "../ErrorBoundary";
import CartData from "./CartData/CartData";
import EmptyCart from "./EmptyCart/EmptyCart";

const SidebarCart = () => {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const isCartOpening = useSelector(isCartOpeningSelector);
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
    dispatch(CLOSE_CART_SIDEBAR());
  });

  useEffect(() => {
    if (user) {
      const userId = user._id;
      dispatch(fetchCart(userId));
    }
  }, [user]);

  useEffect(() => {
    return () => dispatch(CLOSE_CART_SIDEBAR());
  },[]);

  return ReactDom.createPortal(
    <div
      style={isCartOpening ? visibleOverlay : unvisibleOverlay}
      className="fixed transition-[opacity] opacity-0 duration-500 top-0 z-20 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] "
    >
      <div
        style={isCartOpening ? visibleCart : {}}
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
