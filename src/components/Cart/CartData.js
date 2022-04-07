import { MdOutlinePaid } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { convertToPrice } from "../../helper/converToPrice";
import { caculateSale } from "../../helper/caculateSale";
import {
  allCartProductsSelector,
  OPEN_CART_SIDEBAR,
} from "../../features/cartSlice";
import { userSelector } from "../../features/accountSlice";
import { useNavigate } from "react-router-dom";
import ProductPrice from "./ProductPrice";
import ProductName from "./ProductName";
import ProductImage from "./ProductImage";

const CartData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCartProducts = useSelector(allCartProductsSelector);
  const user = useSelector(userSelector);
  const productPriceProps = {
    allCartProducts,
    user,
  };
  const handleNavToCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div>
      <div className="border-y-[3px] border-border_bottom_filter pb-2">
        {allCartProducts?.map((product, index) => {
          return (
            <li
              key={product?._id}
              className="flex max-w-[90%] m-auto mt-2 border border-border_cart_color p-2"
            >
              <ProductImage product={product} />
              <ProductName
                product={product}
                index={index}
                user={user}
                allCartProducts={allCartProducts}
              />
              <ProductPrice product={product} {...productPriceProps} />
            </li>
          );
        })}
      </div>
      <div className="px-4 ">
        <div className="flex justify-between py-7">
          <span className=" font-bold text-light_grey text-sm">Tổng tiền</span>
          <span className="font-bold text-light_grey text-sm">
            {convertToPrice(moneyTotal(allCartProducts))} đ
          </span>
        </div>

        <button
          onClick={handleNavToCheckout}
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
    </div>
  );
};
export default CartData;

export const moneyTotal = (allCartProducts) => {
  let initialValue = 0;
  return allCartProducts.reduce((preValue, curProduct) => {
    const amount = curProduct.amount;
    if (curProduct.sale !== 0) {
      return preValue + caculateSale(curProduct);
    }
    return preValue + curProduct?.price * amount;
  }, initialValue);
};
