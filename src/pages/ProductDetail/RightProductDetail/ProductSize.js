import { useDispatch, useSelector } from "react-redux";
import {
  producDetailtWantToBuySelecter,
  UPDATE_PRODUCT_DETAIL_WANT_TO_BUY,
} from "../../../features/productDetailWantToBySlice";

const ProductSize = ({ productDetail }) => {
  return (
    <>
      <div className="flex">
        {productDetail.size?.map((size, index) => (
          <SizeItem key={index} size={size} />
        ))}
      </div>
    </>
  );
};
export default ProductSize;
const SizeItem = ({ size }) => {
  const dispatch = useDispatch();
  const productDetailWantToBuy = useSelector(producDetailtWantToBuySelecter);
  const productSize = productDetailWantToBuy.size;
  const handleChangeSize = (size) => {
    dispatch(UPDATE_PRODUCT_DETAIL_WANT_TO_BUY({ size }));
  };

  return (
    <li
      onClick={() => {
        handleChangeSize(size);
      }}
      style={productSize === size ? { border: "3px solid black" } : {}}
      className={`w-[45px] h-[45px] transition-all duration-250 flex items-center justify-center text-sm  mr-2 mt-5 cursor-pointer  ${
        productSize === size
          ? "border-[3px] border-black"
          : "border border-border_size_color"
      } `}
    >
      {size}
    </li>
  );
};
