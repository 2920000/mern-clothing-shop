import { useDispatch } from "react-redux";
import { OPEN_CART_SIDEBAR } from "../../features/cartSlice";

const EmptyCart = () => {
  const dispatch = useDispatch();
  return (
    <div>
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
