import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  allCartProductsSelector,
  OPEN_CART_SIDEBAR,
} from "../../features/cartSlice";
import SidebarCart from "../Cart/SidebarCart";
import ErrorBoundary from "../error-boundary/ErrorBoundary";

const HeaderIconRight = ({ setSearch, setBackgroundHeader }) => {
  const dispatch = useDispatch();
  const path=useLocation().pathname
  const [amount, setAmount] = useState();
  const allCartProducts = useSelector(allCartProductsSelector);

  useEffect(() => {
    if (allCartProducts?.length !== 0) {
      let amount = 0;
      for (let i = 0; i < allCartProducts?.length; i++) {
        amount = Number(amount) + Number(allCartProducts[i].amount);
      }
      setAmount(amount);
    }
  });

  const handleShowCart = () => {
    dispatch(OPEN_CART_SIDEBAR(true));
  };
  const handleSearch = () => {
    setSearch(false);
    setBackgroundHeader(true);
  };
  
  if (path === "/checkout") {
    return <></>;
  }
  return (
    <div className="flex grow justify-end items-center max-w-[33.33%]">
      <IoIosSearch
        onClick={handleSearch}
        className="text-[2rem]  cursor-pointer mr-5 block lg:hidden"
      />
      <div>
        <div className="relative w-full h-full ">
          <BsCart3
            onClick={handleShowCart}
            className="text-2xl cursor-pointer"
          />
          <div className="absolute flex items-center justify-center top-[-5px] right-[-5px] w-4 h-4 text-[0.6rem] text-white rounded-full bg-black">
            {amount}
          </div>
        </div>
      </div>
      <ErrorBoundary>
        <SidebarCart />
      </ErrorBoundary>
    </div>
  );
};
export default HeaderIconRight;
