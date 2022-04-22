import { useGetProductDetailQuery } from "../../services/detailProductApi";
import { Link, useParams } from "react-router-dom";
import ProductDetailSkeleton from "../../components/skeleton/ProductDetailSkeleton";
import { useEffect} from "react";
import ProductDetailImages from "./ProductDetailImages";
import ProductDetailInformation from "./ProductDetailInformation";
import ProductDetailRatings from "./ProductDetailRatings";
import ProductDetailRelated from "./ProductDetailRelated";

function ProductDetail() {
  const { slug } = useParams();
  const { data, isFetching, refetch } = useGetProductDetailQuery(slug);
  window.scrollTo(0, 0);

  useEffect(() => {
    refetch();
  },[slug]);
  
  if (isFetching || !data) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div className="max-w-[1450px] px-2 lg:px-10 m-auto pt-[20px]">
      <p className="text-xs mb-5 ">
        <Link to="/">Trang chủ</Link>
        <span className="mx-2">
          <span className="mr-2">/</span>Tất cả <span className="ml-2">/</span>
        </span>
        {data.title}
      </p>
      <div className="flex flex-col lg:flex-row relative  ">
        <ProductDetailImages productDetail={data} />
        <ProductDetailInformation productDetail={data} />
      </div>
      <ProductDetailRatings />
      <ProductDetailRelated productId={data._id} />
    </div>
  );
}

export default ProductDetail;
