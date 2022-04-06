import { FiTrash } from "react-icons/fi";
import { MdOutlinePaid } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { convertToPrice } from "../../helper/converToPrice";
import { caculateSale } from "../../helper/caculateSale";
import {
  allCartProductsSelector,
  OPEN_CART_SIDEBAR,
} from "../../features/cartSlice";
import { userSelector } from "../../features/accountSlice";
import InputNumberBox from "../../pages/product-detail/InputNumberBox";
import removeCartProductUI from "../../helper/removeCartProductUI";
import { removeCartProductFromDatabase } from "../../api/cartApi";

const CartData = () => {
  const dispatch = useDispatch();
  const allCartProducts = useSelector(allCartProductsSelector);
  const user = useSelector(userSelector);

  const productPriceProps = {
    allCartProducts,
    user,
  };

  return (
    <div>
      <div className="border-y-[3px] border-border_bottom_filter pb-2">
        {allCartProducts?.map((product, index) => {
          return (
            <li
              key={product._id}
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
        <a
          href="/checkout"
          className=" py-3 flex justify-center items-center bg-black cursor-pointer text-white font-bold text-lg "
        >
          <MdOutlinePaid className="mr-1" /> Thanh toán
        </a>
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

const ProductPrice = ({ product, allCartProducts, user }) => {
  const dispatch = useDispatch();
  const handleDeleteCartFromLocal = (productId) => {
    removeCartProductUI(allCartProducts, productId, dispatch, "localstorage");
  };
  const handleDeleteCartFromDatabase = (productId, userId) => {
    const payload = {
      productId,
      userId,
    };
    removeCartProductFromDatabase(payload);
    removeCartProductUI(allCartProducts, productId, dispatch);
  };
  return (
    <div className=" flex items-end flex-col justify-between text-sm ">
      <span>
        <FiTrash
          onClick={() => {
            user
              ? handleDeleteCartFromDatabase(product._id, user._id)
              : handleDeleteCartFromLocal(product.id);
          }}
          className="text-xs cursor-pointer"
        />
      </span>
      <div>
        {product.sale !== 0 && (
          <span className="text-red whitespace-nowrap mr-2">
            {convertToPrice(caculateSale(product))} đ
          </span>
        )}
        <span
          className={`whitespace-nowrap ${
            product.sale !== 0 && "line-through text-money_line_through_color"
          } `}
        >
          {convertToPrice(product.price * product.amount)} đ
        </span>
      </div>
    </div>
  );
};

const ProductName = ({ product, index, user, allCartProducts }) => {
  return (
    <div className="mt-1 w-full flex flex-col justify-between ">
      <a href={`/products/${product._id}`} className="font-bold text-[13.5px]">
        {product.title} - {product.size}
      </a>
      <span className="max-w-[60px] max-h-[40px]">
        <InputNumberBox
          amount={product.amount}
          allCartProducts={allCartProducts}
          index={index}
          product={product}
          user={user}
          type="sidebar"
        />
      </span>
    </div>
  );
};

const ProductImage = ({ product }) => {
  return (
    <a href={`/products/${product._id}`} className="mr-3">
      {" "}
      <img className="max-w-[70px] " src={product.image} alt="" />
    </a>
  );
};

const moneyTotal = (allCartProducts) => {
  let initialValue = 0;
  return allCartProducts.reduce((preValue, curProduct) => {
    const amount = curProduct.amount;
    if (curProduct.sale !== 0) {
      return preValue + caculateSale(curProduct);
    }
    return preValue + curProduct?.price * amount;
  }, initialValue);
};
