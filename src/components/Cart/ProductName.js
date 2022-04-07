import InputNumberBox from "../../pages/product-detail/InputNumberBox";

const ProductName = ({ product, index, user, allCartProducts }) => {
    return (
      <div className="mt-1 w-full flex flex-col justify-between ">
        <a href={`/products/${product.productId}`} className="font-bold text-[13.5px]">
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
export default ProductName  