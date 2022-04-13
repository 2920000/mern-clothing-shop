const ProductTitle = ({ productDetail }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <span className="inline-block min-w-[60px]">{productDetail.brand}</span>
        {productDetail.sale > 0 && (
          <span className="bg-red text-white py-1.5 px-5 font-bold">Sale</span>
        )}
      </div>
      <h3 className="font-extrabold mb-2 text-[1.8rem]">
        {productDetail.title}
      </h3>
    </>
  );
};

export default ProductTitle;
