const ProductImage = ({ product }) => {
  return (
    <a href={`/products/${product.productId}`} className="mr-3">
      {" "}
      <img className="max-w-[70px] " src={product.image} alt="" />
    </a>
  );
};
export default ProductImage;
