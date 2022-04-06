import React, { useEffect } from "react";
import ProductsInCart from "./ProductsInCart";
import { MdOutlinePlace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../features/accountSlice";
import {
  fetchShippingInfor,
  shippingInforSelector,
} from "../../features/userSlice";
import ShippingInforModal from "../../modal/ShippingInforModal";
function CheckoutPage() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const shippingInfor = useSelector(shippingInforSelector);
  const existingShippingInfor=shippingInfor&&Object.keys(shippingInfor).length!==0
  useEffect(() => {
    dispatch(fetchShippingInfor(user._id));
  }, []);
 
  return (
    <div className="bg-[#f5f5f5] overflow-auto min-h-screen w-full h-full">
      <div className="max-w-[1200px] m-auto">
        <div className="bg-white">
          <Address />
        </div>
        <div className="flex w-full ">
          <ProductsInCart />
        </div>
      </div>
      {!existingShippingInfor&&<ShippingInforModal/>}
    </div>
  );
}

export default CheckoutPage;

const Address = () => {
  const shippingInfor = useSelector(shippingInforSelector);

  return (
    <div className=" my-3 pt-6 pb-5 px-8 gap-2">
      <div className="flex items-center text-xl mb-2">
        <MdOutlinePlace className="text-xl" /> Địa chỉ giao hàng
      </div>
      <div>
        <div className="inline-block font-bold  mr-4">
          <span className="mr-1">{shippingInfor?.fullName}</span>
          <span>{shippingInfor?.phoneNumber}</span>
        </div>
        <span>{shippingInfor?.address}</span>
      </div>
    </div>
  );
};
