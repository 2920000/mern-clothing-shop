import { useEffect, useState } from "react";
import StarRating from "../../../modal/RatingModal/RatingModalMain/ProductReviews/StarRating";
import { Star } from "./ProductRatings";

const ProductRatingsOverview = ({ data, setProductRatingsList }) => {
  const [starsAverage, setStarsAverage] = useState(0);
  const [active, setActive] = useState(0);

  const starsNumberByFilter = (condition) => {
    return data?.filter((e) => e.starRating === condition)?.length;
  };

  const filterByStarRatingList = [
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
      return preComment + curComment.starRating;
    }, 0);
    setStarsAverage(Math.floor(starsTotal / data.length));
  }, [data]);

  const handleFilterReviews = (condition, index) => {
    if (condition === "All") {
      setActive(index);
      setProductRatingsList(data);
      return;
    }
    const filteredData = data.filter(
      (review) => review.starRating === condition
    );
    setProductRatingsList(filteredData);
    setActive(index);
  };
  const filterStyle = {
    border: "1px solid red",
    color: "red",
  };

  return (
    <div className="flex justify-between gap-14 w-full min-h-[100px] p-10 mt-4 bg-[#F7F8FA]">
      <div className="flex flex-col items-center">
        <div className="mb-1 text-lg">
          <span className="text-4xl mr-1">{starsAverage}</span> trên 5
        </div>
       <StarRating className='text-2xl'  number={starsAverage} />
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        {filterByStarRatingList.map((item, index) => (
          <div
            key={index}
            style={active === index ? filterStyle : {}}
            onClick={() => handleFilterReviews(item.condition, index)}
            className="flex justify-center items-center min-w-[100px] min-h-[35px] max-h-[35px] cursor-pointer border border-black rounded-sm"
          >
            {item.displayName}
            {item.condition !== "All" && <span>({item.starsNumberByFilter})</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductRatingsOverview;
