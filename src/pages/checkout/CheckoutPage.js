import React, { useEffect } from "react";
import ProductsInCart from "./ProductsInCart";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../features/accountSlice";
import {
  fetchShippingInfor,
  shouldUpdateShippingInforSelector,
} from "../../features/userSlice";
import ShippingInforModal from "../../modal/ShippingInforModal";
import { useGetCartProductsQuery } from "../../services/cartProductsApi";
import {
  isOrderSelector,
  orderStatusSelector,
  SET_ORDER_STATUS,
} from "../../features/checkoutSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import ErrorBoundary from "../../components/error-boundary/ErrorBoundary";
import Address from "./Address";
import ShippingMethod from "./ShippingMethod";
import Payment from "./Payment";
import IsOrderingLoading from "../../components/loading/IsOrderingLoading";
function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const shouldUpdateShippingInfor = useSelector(
    shouldUpdateShippingInforSelector
  );
  const isOrder = useSelector(isOrderSelector);
  const orderStatus = useSelector(orderStatusSelector);
  const { data, isLoading, isError, refetch } = useGetCartProductsQuery(
    user._id
  );

  useEffect(() => {
    if (orderStatus) {
      navigate("/user/purchase");
      dispatch(SET_ORDER_STATUS(false));
    }
  }, [orderStatus]);

  useEffect(() => {
    dispatch(fetchShippingInfor(user._id));
    refetch();
  }, []);

  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <>Something wrong</>;
  }
  if (!data) {
    return <>Bị lỗi</>;
  }
  return (
    <div className="bg-[#f5f5f5] overflow-auto min-h-screen w-full h-full">
      <div className="max-w-[1200px] m-auto">
        <ErrorBoundary>
          <Address />
          <ProductsInCart cartProduct={data} />
          <ShippingMethod />
          <Payment cartProducts={data} />
        </ErrorBoundary>
      </div>
      {shouldUpdateShippingInfor && <ShippingInforModal />}
      {isOrder && <IsOrderingLoading/>}
    </div>
  );
}

export default CheckoutPage;
