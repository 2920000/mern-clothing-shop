import { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar, BsStarHalf } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useGetReviewsQuery } from "../../../services/detailProductApi";
function ProductReviews() {
  const { productId } = useParams();
  const { data, isLoading, isError } = useGetReviewsQuery(productId);
  const [reviewsList, setReviewsList] = useState(data);

  useEffect(() => {
    if (data) {
      setReviewsList(data);
    }
  }, [data]);

  if (data?.length === 0 || !data) {
    return <></>;
  }

  return (
    <div className="mt-20">
      <h3 className="text-2xl tracking-wider font-bold">Đánh giá sản phẩm</h3>
      <RatingOverview
        data={data}
        setReviewsList={setReviewsList}
      />
      <RatingList reviewsList={reviewsList} />
    </div>
  );
}

export default ProductReviews;

const RatingOverview = ({ data, setReviewsList }) => {
  const [starsAverage, setStarsAverage] = useState(0);
  const [active, setActive] = useState(0);

  const starsNumberByFilter = (condition) => {
    return data?.filter((e) => e.reviewStar === condition)?.length;
  };

  const filterStarList = [
    {
      displayName: "Tất cả",
      condition: "All",
    },
    {
      displayName: "5 sao",
      condition: 5,
      starsNumberByFilter: starsNumberByFilter(5),
    },
    {
      displayName: "4 sao",
      condition: 4,
      starsNumberByFilter: starsNumberByFilter(4),
    },
    {
      displayName: "3 sao",
      condition: 3,
      starsNumberByFilter: starsNumberByFilter(3),
    },
    {
      displayName: "2 sao",
      condition: 2,
      starsNumberByFilter: starsNumberByFilter(2),
    },
    {
      displayName: "1 sao",
      condition: 1,
      starsNumberByFilter: starsNumberByFilter(1),
    },
  ];

  useEffect(() => {
    if (!data) {
      return;
    }
    const starsTotal = data.reduce((preComment, curComment) => {
      return preComment + curComment.reviewStar;
    }, 0);
    setStarsAverage(Math.floor(starsTotal / data.length));
  }, [data]);

  const handleFilterReviews = (condition, index) => {
    if (condition === "All") {
      setActive(index);
      setReviewsList(data);
      return;
    }
    const filteredData = data.filter(
      (review) => review.reviewStar === condition
    );
    setReviewsList(filteredData);
    setActive(index);
  };
  const filterStyle = {
    border: "1px solid red",
    color: "red",
  };

  return (
    <div className="flex justify-between gap-14 w-full min-h-[100px] p-10 mt-4 bg-[#F7F8FA]">
      <div className="text-red">
        <div>
          <span className="text-3xl mr-1">{starsAverage}</span> trên 5
        </div>
        <div className="flex items-center text-2xl relative">
          <Star number={5} outline />
          <div className="flex absolute">
            <Star number={starsAverage} />
          </div>
        </div>
      </div>
      <div className="flex gap-2 text-sm">
        {filterStarList.map((item, index) => (
          <div
            key={index}
            style={active === index ? filterStyle : {}}
            onClick={() => handleFilterReviews(item.condition, index)}
            className="flex justify-center items-center min-w-[100px] min-h-[35px] max-h-[35px] cursor-pointer border border-black rounded-sm"
          >
            {item.displayName}
            {item.condition !== "All" && (
              <span>({item.starsNumberByFilter})</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const RatingList = ({ reviewsList }) => {
  if (reviewsList?.length === 0) {
    return (
      <div className="min-h-[500px] flex justify-center items-center">
        Chưa có đánh giá
      </div>
    );
  }
  return (
    <div className="px-5">
      {reviewsList?.map((review, index) => (
        <ReviewItem review={review} key={index}/>
      ))}
    </div>
  );
};

const Star = ({ number, outline }) => {
  if (outline) {
    return Array(number)
      .fill()
      .map((star) => <AiOutlineStar />);
  }
  return Array(number)
    .fill()
    .map((star) => <AiFillStar />);
};

export const ReviewItem=({review})=>{
  return <div className="flex border-b border-border py-6">
          <div className="mr-2">
            <img
              className="max-w-[40px] rounded-full "
              src="https://www.pngkey.com/png/detail/202-2024792_user-profile-icon-png-download-fa-user-circle.png"
              alt=""
            />
          </div>
          <div>
            <span className="text-xs">{review.userInfor.username}</span>
            <div className="flex items-center text-sm relative mt-1">
              <Star number={5} outline />
              <div className="flex absolute">
                <Star number={review.reviewStar} />
              </div>
            </div>
            <div className="my-4 text-xs">{review.created_at}</div>
            <p className="text-sm mb-2 ">{review.reviewText}</p>
            <div className="flex  gap-3">
              {review.availableReviews.map((availableReview) => (
                <p className="p-1.5 px-3 text-sm rounded-3xl border border-border">
                  {availableReview}
                </p>
              ))}
            </div>
          </div>
        </div>
}