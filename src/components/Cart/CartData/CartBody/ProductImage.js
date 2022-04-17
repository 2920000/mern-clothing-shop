const ProductImage = ({ cartProduct }) => {
  return (
    <a href={`/products/${cartProduct.productId}`} className="mr-3">
      {" "}
      <img className="max-w-[70px] " src={cartProduct.image} alt="" />
    </a>
  );
};
export default ProductImage;
