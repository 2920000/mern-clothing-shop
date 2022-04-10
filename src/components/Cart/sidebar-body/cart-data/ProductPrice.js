import { FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { removeCartProductFromDatabase } from "../../../../api/cartApi";
import { caculateSale } from "../../../../helper/caculateSale";
import { convertToPrice } from "../../../../helper/converToPrice";
import removeCartProductUI from "../../../../helper/removeCartProductUI";

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
      <div className="relative">
        {product.sale !== 0 && (
          <span className="text-red absolute bottom-4 whitespace-nowrap mr-2">
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

export default ProductPrice;
