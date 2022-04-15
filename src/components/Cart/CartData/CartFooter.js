import { MdOutlinePaid } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSelector } from "../../../features/accountSlice";
import {
  allCartProductsSelector,
  OPEN_CART_SIDEBAR,
} from "../../../features/cartSlice";
import { calculateMoneyTotal } from "../../../helper/calculateMoneyTotal";
import { convertToPrice } from "../../../helper/converToPrice";

const CartFooter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCartProducts = useSelector(allCartProductsSelector);
  const user = useSelector(userSelector);
  return (
    <>
      <div className="px-4 ">
        <div className="flex justify-between py-7">
          <span className=" font-bold text-light_grey text-sm">Tổng tiền</span>
          <span className="font-bold text-light_grey text-sm">
            {convertToPrice(calculateMoneyTotal(allCartProducts))} đ
          </span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className={` relative ${
            user ? "cursor-pointer" : "cursor-not-allowed opacity-70"
          } py-3 w-full flex justify-center items-center bg-black cursor-pointer text-white font-bold text-lg`}
          disabled={!user && true}
        >
          {" "}
          <MdOutlinePaid className="mr-1" />
          Thanh toán
          {!user && (
            <span className="opacity-0 flex transition-all duration-150 items-center justify-center absolute top-0 right-0 bottom-0 left-0 bg-black hover:opacity-100">
              Đăng nhập để thanh toán
            </span>
          )}
        </button>
      </div>
      <p
        onClick={() => {
          dispatch(OPEN_CART_SIDEBAR(false));
        }}
        className="text-center mt-5 underline cursor-pointer text-[13.5px]"
      >
        Tiếp tục mua sắm
      </p>
    </>
  );
};
export default CartFooter;
