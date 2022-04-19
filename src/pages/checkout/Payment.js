import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../features/accountSlice";
import {
  addOrdersToDatabase,
  SET_LOADING,
  shippingFeeSelector,
} from "../../features/checkoutSlice";
import { calculateMoneyTotal, convertToPrice } from "../../helper";

const Payment = ({ cartProducts }) => {
  const dispatch = useDispatch();
  const shippingFee = useSelector(shippingFeeSelector);
  const user = useSelector(userSelector);
  const totalProductsMoney = calculateMoneyTotal(cartProducts);
  const moneyTotal = totalProductsMoney + shippingFee;

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
      subInfor: moneyTotal,
    },
  ];

  const handleOrder = () => {
    const payload = {
      userId: user._id,
      orders: cartProducts,
    };
    dispatch(SET_LOADING(true));
    setTimeout(() => {
      dispatch(addOrdersToDatabase(payload));
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full px-2 items-end mt-5 mb-16 bg-white">
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
      <div className="w-full mder:m-6 border-border">
        <div
          onClick={handleOrder}
          className="mder:float-right  flex justify-center items-center w-full mder:w-[200px] h-[40px] bg-black text-white cursor-pointer rounded-sm"
        >
          Đặt Hàng
        </div>
      </div>
    </div>
  );
};
export default Payment;
