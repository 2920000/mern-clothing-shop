import { useSelector } from "react-redux";
import { allCartProductsSelector } from "../../../../features/cartSlice";
import CartProductItem from "./CartProductItem";

const CartBody = () => {
    const allCartProducts = useSelector(allCartProductsSelector);
    return (
      <div className="border-y-[3px] border-border_bottom_filter pb-2">
        {allCartProducts?.map((product, index) => (
          <CartProductItem
            product={product}
            index={index}
            allCartProducts={allCartProducts}
          />
        ))}
      </div>
    );
  };
  export default CartBody

  