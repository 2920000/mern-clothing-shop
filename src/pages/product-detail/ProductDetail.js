import { Link, useParams } from "react-router-dom";
import LeftProductDetail from "./LeftProductDetail";
import RightProductDetail from "./RightProductDetail";
import Review from "./Review";
import ProductDetailSkeleton from "../../components/skeleton1/ProductDetailSkeleton";
import { useGetProductDetailQuery } from "../../services/detailProductApi";
function ProductDetail() {
  const { productId } = useParams();
  const {data,isLoading}=useGetProductDetailQuery(productId)
  window.scrollTo(0, 0);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }
  return (
    <div className="max-w-[1350px] px-10 m-auto pt-[20px] ">
      <p className="text-xs mb-5 ">
        <Link to="/">Trang chủ</Link>
        <span className="mx-2">
          <span className="mr-2">/</span>Tất cả <span className="ml-2">/</span>
        </span>
        {data.title}
      </p>
      <div className="flex relative  ">
        <LeftProductDetail productDetail={data} />
        <RightProductDetail productDetail={data} />
      </div>
      <div>
        <Review />
      </div>
    </div>
  );
}

export default ProductDetail;
