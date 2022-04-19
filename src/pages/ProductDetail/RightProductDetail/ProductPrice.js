import { calculateSale, convertToPrice } from "../../../helper";

const ProductPrice = ({ productDetail }) => {
  return (
    <>
      {productDetail.sale > 0 ? (
        <div className="flex items-center">
          <span className="mr-2 text-lg text-red">
            {convertToPrice(calculateSale(productDetail))}đ
          </span>
          <span className="text-sm line-through text-light_grey mr-1">
            {convertToPrice(productDetail.price)}đ
          </span>
          <span className="w-10 h-5 bg-black text-white text-xs flex justify-center items-center ml-2">
            -{productDetail.sale}%
          </span>
        </div>
      ) : (
        <span className="text-lg">{convertToPrice(productDetail.price)}đ</span>
      )}
    </>
  );
};

export default ProductPrice;
