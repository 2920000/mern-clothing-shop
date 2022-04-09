import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../features/accountSlice";
import { allCartProductsSelector } from "../../../features/cartSlice";
import addProductToDatabase from "../../../helper/addProductToDatabase";
import addProductToLocal from "../../../helper/addProductToLocal";
import InputNumberBox from "../InputNumberBox";

const ProductPurchase = ({ productDetail, productSize }) => {
    const user = useSelector(userSelector);
    const allCartProducts = useSelector(allCartProductsSelector);
    const dispatch = useDispatch();
    return (
      <div className="flex  mt-5">
        <div className="">
          <InputNumberBox />
        </div>
        <div
          onClick={() => {
            user
              ? addProductToDatabase(
                  productDetail,
                  user._id,
                  dispatch,
                  allCartProducts,
                  productSize
                )
              : addProductToLocal(productDetail, dispatch, productSize);
          }}
          className="flex-grow py-2.5 ml-3 bg-black hover:bg-white hover:text-black cursor-pointer border border-black transition-all duration-150  text-white flex justify-center items-center text-lg font-bold"
        >
          Thêm vào giỏ hàng
        </div>
      </div>
    );
  };

  export default ProductPurchase