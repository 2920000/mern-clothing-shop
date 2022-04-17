import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedStarRatingIndexSelector,
  UPDATE_SELECTED_TAGS_RATING,
  UPDATE_STAR_RATING_INDEX,
} from "../../features/ratingSlice";

const StarRating = () => {
  const dispatch = useDispatch();
  const currentStarRatingIndex = useSelector(selectedStarRatingIndexSelector);

  const handleReviewWithStar = (starIndex) => {
    dispatch(UPDATE_STAR_RATING_INDEX(starIndex));
    dispatch(UPDATE_SELECTED_TAGS_RATING({}));
  };
  return (
    <div className="flex justify-center mb-5">
      {Array(5)
        .fill()
        .map((star, index) => (
          <div
            key={index}
            onClick={() => handleReviewWithStar(index)}
            className="relative"
          >
            <AiOutlineStar className=" text-4xl  cursor-pointer" />
            {index <= currentStarRatingIndex && (
              <AiFillStar className="absolute top-0 text-4xl text-orange-400 cursor-pointer" />
            )}
          </div>
        ))}
    </div>
  );
};
export default StarRating;
