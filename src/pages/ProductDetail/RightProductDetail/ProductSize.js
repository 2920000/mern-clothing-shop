const ProductSize = ({ productDetail, productSize, handleChangeSize }) => {
  const sizeItemProps = {
    productSize,
    handleChangeSize,
  };
  return (
    <>
      <div className="flex">
        {productDetail.size?.map((s, index) => (
          <SizeItem key={index} size={s} {...sizeItemProps} />
        ))}
      </div>
    </>
  );
};
export default ProductSize;
const SizeItem = ({ size, productSize, handleChangeSize }) => {
  return (
    <li
      onClick={() => {
        handleChangeSize(size);
      }}
      style={productSize === size ? { border: "3px solid black" } : {}}
      className={`w-[45px] h-[45px] transition-all duration-250 flex items-center justify-center text-sm  mr-2 mt-5 cursor-pointer  ${
        productSize === size
          ? "border-[3px] border-black"
          : "border border-border_size_color"
      } `}
    >
      {size}
    </li>
  );
};
