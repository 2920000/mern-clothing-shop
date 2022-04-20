import { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar, BsStarHalf } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useGetRatingQuery } from "../../../services/detailProductApi";
import ProductRatingsList from "./ProductRatingsList";
import ProductRatingsOverview from "./ProductRatingsOverview";
function ProductDetailRatings() {
  const { slug } = useParams();
  const { data, refetch } = useGetRatingQuery(slug);
  const [productRatingsList, setProductRatingsList] = useState(data);

  useEffect(() => {
    if (data) {
      setProductRatingsList(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  if (data?.length === 0 || !data) {
    return <></>;
  }

  return (
    <div className="mt-20">
      <h3 className="text-2xl tracking-wider font-bold">Đánh giá sản phẩm</h3>
      <ProductRatingsOverview
        data={data}
        setProductRatingsList={setProductRatingsList}
      />
      <ProductRatingsList productRatingsList={productRatingsList} />
    </div>
  );
}

export default ProductDetailRatings;


