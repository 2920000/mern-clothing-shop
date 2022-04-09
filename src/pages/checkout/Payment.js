import { useDispatch, useSelector } from "react-redux";
import { moneyTotal } from "../../components/Cart/CartData";
import { userSelector } from "../../features/accountSlice";
import {
  addOrdersToDatabase,
  shippingFeeSelector,
} from "../../features/checkoutSlice";
import { convertToPrice } from "../../helper/converToPrice";

const Payment = ({ cartProducts }) => {
  const dispatch = useDispatch();
  const shippingFee = useSelector(shippingFeeSelector);
  const user = useSelector(userSelector);
  const totalProductsMoney = moneyTotal(cartProducts);
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
  const handleOrder = () => {
    const payload = {
      userId: user._id,
      orders: cartProducts,
    };
    dispatch(addOrdersToDatabase(payload));
  };
  return (
    <div className="flex flex-col items-end mt-5 mb-16 bg-white">
      <div className="flex flex-col gap-y-3 m-6">
        {inforPayment.map((infor, index) => (
          <div
            key={index}
            className="flex justify-between items-center gap-x-7"
          >
            <span className="text-sm">{infor.title}</span>
            <span className={`${index === 2 ? "text-2xl" : "text-sm"}`}>
              {convertToPrice(infor?.subInfor)} đ
            </span>
          </div>
        ))}
      </div>
      <div className="border-t w-full border-border">
        <div
          onClick={handleOrder}
          className="float-right flex justify-center items-center m-6 w-[200px] h-[40px] bg-black text-white cursor-pointer rounded-sm"
        >
          Đặt Hàng
        </div>
      </div>
    </div>
  );
};
export default Payment;
