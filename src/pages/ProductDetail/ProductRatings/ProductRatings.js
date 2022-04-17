import { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar, BsStarHalf } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useGetRatingQuery } from "../../../services/detailProductApi";
import ProductRatingsList from "./ProductRatingsList";
import ProductRatingsOverview from "./ProductRatingsOverview";
function ProductRatings() {
  const { productId } = useParams();
  const { data,refetch} = useGetRatingQuery(productId);
  const [productRatingsList, setProductRatingsList] = useState(data);

  useEffect(() => {
    if (data) {
      setProductRatingsList(data);
    }
  }, [data]);

  useEffect(()=>{
    refetch()
  },[])

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

export default ProductRatings;

export const Star = ({ number, outline }) => {
  if (outline) {
    return Array(number)
      .fill()
      .map((star) => <AiOutlineStar />);
  }
  return Array(number)
    .fill()
    .map((star) => <AiFillStar />);
};
