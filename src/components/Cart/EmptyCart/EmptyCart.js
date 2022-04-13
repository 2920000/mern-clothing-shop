import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  allCartProductsSelector,
  OPEN_CART_SIDEBAR,
} from "../../../features/cartSlice";

const EmptyCart = () => {
  const dispatch = useDispatch();
  const allCartProducts = useSelector(allCartProductsSelector);
  if (allCartProducts) {
    return <></>;
  }
  return (
    <div>
      <div className="flex text-right justify-end  text-3xl py-2 ">
        <IoClose
          className="cursor-pointer"
          onClick={() => {
            dispatch(OPEN_CART_SIDEBAR(false));
          }}
        />
      </div>
      <p className="text-xl text-center mt-3 mb-5 ">GIỎ HÀNG CỦA BẠN TRỐNG</p>
      <div
        onClick={() => {
          dispatch(OPEN_CART_SIDEBAR(false));
        }}
        className="max-w-[88%] rounded-sm cursor-pointer py-4 bg-black text-white  text-sm m-auto text-center"
      >
        TIẾP TỤC MUA SẮM
      </div>
    </div>
  );
};
export default EmptyCart;
