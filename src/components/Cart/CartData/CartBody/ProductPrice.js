import { FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { removeCartProductFromDatabase } from "../../../../api/cartApi";
import { calculateSale } from "../../../../helper/Calculator";
import { convertToPrice } from "../../../../helper/Converter";
import { deleteCartProductFromLocal } from "../../../../helper/CrudShoppingCart";

const ProductPrice = ({ cartProduct, allCartProducts, user }) => {
  const dispatch = useDispatch();
  const handleDeleteCartFromLocal = (productId) => {
    deleteCartProductFromLocal(allCartProducts, productId, dispatch, "localstorage");
  };
  const handleDeleteCartFromDatabase = (productId, userId) => {
    const payload = {
      productId,
      userId,
    };
    removeCartProductFromDatabase(payload);
    deleteCartProductFromLocal(allCartProducts, productId, dispatch);
  };
  return (
    <div className=" flex items-end flex-col justify-between text-sm ">
      <span>
        <FiTrash
          onClick={() => {
            user
              ? handleDeleteCartFromDatabase(cartProduct._id, user._id)
              : handleDeleteCartFromLocal(cartProduct.id);
          }}
          className="text-xs cursor-pointer"
        />
      </span>
      <div className="relative">
        {cartProduct.sale !== 0 && (
          <span className="text-red absolute bottom-4 whitespace-nowrap mr-2">
            {convertToPrice(calculateSale(cartProduct))} đ
          </span>
        )}
        <span
          className={`whitespace-nowrap ${
            cartProduct.sale !== 0 && "line-through text-money_line_through_color"
          } `}
        >
          {convertToPrice(cartProduct.price * cartProduct.amount)} đ
        </span>
      </div>
    </div>
  );
};

export default ProductPrice;
