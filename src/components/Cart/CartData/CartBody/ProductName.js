import { useEffect, useState } from "react";
import QuantityInput from "../../../../pages/ProductDetail/QuantityInput";

const ProductName = ({ cartProduct, index, user, allCartProducts }) => {
 const [update,setUpdate]=useState(false)
 useEffect(()=>{
   if(user){
     setUpdate(true)
   }else{
     setUpdate(false)
   }
 },[user])
  return (
    <div className="mt-1 w-full flex flex-col justify-between ">
      <a
        href={`/products/${cartProduct.productId}`}
        className="font-bold text-[13.5px]"
      >
        {cartProduct.title} - {cartProduct.size}
      </a>
      <span className=" max-h-[40px]">
        <QuantityInput
          arrowUp="text-xs"
          arrowDown="text-xs"
          wrapper="min-h-[40px]"
          shouldUpdateQuantityToLocal={!update}
          shouldUpdateQuantityToDatabase={update}
          cartProduct={cartProduct}
        />
      </span>
    </div>
  );
};
export default ProductName;
