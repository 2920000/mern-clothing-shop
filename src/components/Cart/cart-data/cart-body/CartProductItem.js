import { useSelector } from "react-redux";
import { userSelector } from "../../../../features/accountSlice";
import ProductImage from "./ProductImage";
import ProductName from "./ProductName";
import ProductPrice from "./ProductPrice";

const CartProductItem = ({ product, index, allCartProducts }) => {
  const user = useSelector(userSelector);
  const productPriceProps = {
    allCartProducts,
    user,
  };
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
};
export default CartProductItem;
