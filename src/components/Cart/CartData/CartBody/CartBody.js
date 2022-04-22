import { useSelector } from "react-redux";
import { userSelector } from "../../../../features/accountSlice";
import { allCartProductsSelector } from "../../../../features/cartSlice";
import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";
import ProductName from "./ProductName";

const CartBody = () => {
  const allCartProducts = useSelector(allCartProductsSelector);
  return (
    <div className="border-y-[3px] border-border_bottom_filter pb-2">
      {allCartProducts?.map((cartProduct, index) => (
        <CartProductItem
          key={index}
          cartProduct={cartProduct}
          index={index}
          allCartProducts={allCartProducts}
        />
      ))}
    </div>
  );
};
export default CartBody;

const CartProductItem = ({ cartProduct, index, allCartProducts }) => {
  const user = useSelector(userSelector);
  const productPriceProps = {
    allCartProducts,
    user,
  };
  return (
    <li
      key={cartProduct?._id}
      className="flex max-w-[90%] m-auto mt-2 border border-border_cart_color p-2"
    >
      <ProductImage cartProduct={cartProduct} />
      <ProductName
        cartProduct={cartProduct}
        index={index}
        user={user}
        allCartProducts={allCartProducts}
      />
      <ProductPrice cartProduct={cartProduct} {...productPriceProps} />
    </li>
  );
};
