import React, { useEffect } from "react";
import ProductsInCart from "./ProductsInCart";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../features/accountSlice";
import {
  fetchShippingInfor,
  hasShippingInforSelector,
} from "../../features/userSlice";
import ShippingInforModal from "../../modal/ShippingInforModal";
import { useGetCartProductsQuery } from "../../services/cartProductsApi";
import {
  isOrderingSelector,
  orderStatusSelector,
  SET_ORDER_STATUS,
} from "../../features/checkoutSlice";
import { useNavigate } from "react-router-dom";
import Address from "./Address";
import ShippingMethod from "./ShippingMethod";
import Payment from "./Payment";
import ErrorBoundary from "../../components/ErrorBoundary";
import Loading from "../../components/Loading";
import { allCartProductsSelector, fetchCartData } from "../../features/cartSlice";
function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const hasShippingInfor = useSelector(hasShippingInforSelector);
  const isOrdering = useSelector(isOrderingSelector);
  const orderStatus = useSelector(orderStatusSelector);
  const cart=useSelector(allCartProductsSelector)
  // const isLoading =useSelector(isLoad)
  // const { data, isLoading, isError, refetch } = useGetCartProductsQuery(
  //   user._id
  // );

  useEffect(() => {
    if (orderStatus) {
      navigate("/user/purchase");
      dispatch(SET_ORDER_STATUS(false));
    }
  }, [orderStatus]);

  useEffect(() => {
    dispatch(fetchCartData(user._id));
  }, []);

  useEffect(() => {
    dispatch(fetchShippingInfor(user._id));
    // refetch();
  }, []);

  if(!cart){
    return <></>
  }
  
  // if (isLoading || !cart) {
  //   return (
  //     <div className="fixed flex justify-center items-center bg-[rgba(0_0_0_0.4)] top-0 right-0 bottom-0 left-0 z-50">
  //       <Loading />
  //     </div>
  //   );
  // }
  // if (isError) {
  //   return <>Something wrong</>;
  // }

  return (
    <div className="bg-[#f5f5f5] overflow-auto min-h-screen w-full h-full">
      <div className="max-w-[1200px] m-auto">
        <ErrorBoundary>
          <Address />
          <ProductsInCart cartProduct={cart} />
          <ShippingMethod />
          <Payment cartProducts={cart} />
        </ErrorBoundary>
      </div>
      {hasShippingInfor && <ShippingInforModal />}
      {isOrdering && <Loading />}
    </div>
  );
}

export default Checkout;
