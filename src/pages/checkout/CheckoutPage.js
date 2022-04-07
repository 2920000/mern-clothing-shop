import React, { useEffect } from "react";
import ProductsInCart from "./ProductsInCart";
import { MdOutlinePlace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../features/accountSlice";
import {
  fetchShippingInfor,
  shippingInforSelector,
  shouldUpdateShippingInforSelector,
} from "../../features/userSlice";
import ShippingInforModal from "../../modal/ShippingInforModal";
import {
  allCartProductsSelector,
  fetchCartDataFromDatabase,
} from "../../features/cartSlice";
import { convertToPrice } from "../../helper/converToPrice";
import { moneyTotal } from "../../components/Cart/CartData";
function CheckoutPage() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const shouldUpdateShippingInfor = useSelector(
    shouldUpdateShippingInforSelector
  );
  const cartProduct = useSelector(allCartProductsSelector);

  useEffect(() => {
    dispatch(fetchShippingInfor(user._id));
    dispatch(fetchCartDataFromDatabase(user._id));
  }, []);

  return (
    <div className="bg-[#f5f5f5] overflow-auto min-h-screen w-full h-full">
      <div className="max-w-[1200px] m-auto">
        <div className="bg-white">
          <Address />
        </div>
        <div className="flex w-full ">
          <ProductsInCart cartProduct={cartProduct} />
        </div>
        <div>
          <Payment cartProduct={cartProduct} />
        </div>
      </div>
      {shouldUpdateShippingInfor && <ShippingInforModal />}
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
          <span>
            {shippingInfor?.phoneNumber && "(+84)"} {shippingInfor?.phoneNumber}
          </span>
        </div>
        <span>{shippingInfor?.address}</span>
      </div>
    </div>
  );
};

const Payment = ({ cartProduct }) => {
  const totalProductsMoney = moneyTotal(cartProduct);
  const shippingFee = 20000;
  const totalMoney = totalProductsMoney + shippingFee;
  const inforPayment = [
    {
      title: "Tổng tiền hàng",
      subInfor: totalProductsMoney,
    },
    {
      title: "Phí vận chuyển",
      subInfor: shippingFee,
    },
    {
      title: "Tổng thanh toán",
      subInfor: totalMoney,
    },
  ];
  return (
    <div className="flex flex-col items-end mt-5 mb-16 bg-white">
      <div className="flex flex-col gap-y-3 m-6">
        {inforPayment.map((infor, index) => (
          <div key={index} className="flex justify-between items-center gap-x-7">
            <span className="text-sm">{infor.title}</span>
            <span className={`${index===2?'text-2xl':'text-sm'}`} >{convertToPrice(infor?.subInfor)} đ</span>
          </div>
        ))}
      </div>
      <div className="border-t w-full border-border">
        <div className="float-right flex justify-center items-center m-6 w-[200px] h-[40px] bg-black text-white cursor-pointer rounded-sm">Đặt Hàng</div>
      </div>
    </div>
  );
};
