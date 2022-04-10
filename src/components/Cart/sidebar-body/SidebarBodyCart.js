import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../features/accountSlice";
import { allCartProductsSelector, fetchCartDataFromDatabase } from "../../../features/cartSlice";
import ErrorBoundary from "../../error-boundary";
import CartData from "./cart-data";
import EmptyCart from "./empty-cart";

const SidebarBodyCart = () => {
    const dispatch = useDispatch();
    const allCartProducts = useSelector(allCartProductsSelector);
    const user = useSelector(userSelector);
  
    useEffect(() => {
      if (user) {
        const userId = user._id;
        dispatch(fetchCartDataFromDatabase(userId));
      }
    }, [user]);
  
    if (allCartProducts) {
      return (
        <ErrorBoundary>
          <CartData />
        </ErrorBoundary>
      );
    }
    return <EmptyCart />;
  };
export default SidebarBodyCart  