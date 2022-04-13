const ProductDescribe = ({ productDetail }) => {
  const productInfor = productDetail.description?.split("|");

  return (
    <div className="mt-5 ">
      <p className="font-bold text-sm mb-4">Chi tiết sản phẩm</p>
      {productInfor?.map((e, index) => (
        <li key={index} className="text-sm mt-2">
          {e}
        </li>
      ))}
    </div>
  );
};
export default ProductDescribe;
