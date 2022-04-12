import { useSelector } from "react-redux";
import { allCartProductsSelector } from "../../../features/cartSlice";
import CartHeader from "./CartHeader";
import CartBody from "./cart-body/CartBody";
import CartFooter from "./CartFooter";

const CartData = () => {
  const allCartProducts = useSelector(allCartProductsSelector);
  if (!allCartProducts) {
    return <></>;
  }
  return (
    <>
      <CartHeader />
      <CartBody />
      <CartFooter />
    </>
  );
};
export default CartData;
