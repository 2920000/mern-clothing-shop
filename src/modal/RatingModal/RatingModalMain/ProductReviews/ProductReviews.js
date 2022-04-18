import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../../features/accountSlice";
import {
  selectedStarRatingIndexSelector,
  UPDATE_SELECTED_TAGS_RATING,
  UPDATE_STAR_RATING_INDEX,
} from "../../../../features/ratingSlice";
import { useGetOrderedQuery } from "../../../../services/orderedApi";
import StarRating from "./StarRating";
import TagsRating, { TagRatingItem } from "./TagsRating";
import TextComment from "./TextComment";

function ProductReviews({ orderInfor }) {
  const user = useSelector(userSelector);
  let { data } = useGetOrderedQuery(user._id);
  const productRating = data?.productRatings.find(
    (productRating) => productRating._id === orderInfor._id
  );
  const dispatch = useDispatch();
  const currentStarRatingIndex = useSelector(selectedStarRatingIndexSelector);

  const handleRatingWithStar = (starIndex) => {
    dispatch(UPDATE_STAR_RATING_INDEX(starIndex));
    dispatch(UPDATE_SELECTED_TAGS_RATING({}));
  };

  if (!data) {
    return <></>;
  }
  if (productRating) {
    return (
      <div className="flex gap-2">
        <div className="pt-5">
          <Avatar size="small" />
        </div>
        <div className="border-t text-xs border-border py-5 w-full">
          <p>{productRating.userInfor.username}</p>
          <StarRating
            className="text-[1.1rem] my-1"
            number={productRating.starRating}
          />
          <div className="flex mb-3 flex-wrap">
            {productRating.tagsRating.map((tagRating, index) => (
              <TagRatingItem size="small" key={index}>
                {tagRating}
              </TagRatingItem>
            ))}
          </div>
          <span>{productRating.created_at}</span>
        </div>
      </div>
    );
  }
  return (
    <>
      <StarRating
        onClick={handleRatingWithStar}
        number={currentStarRatingIndex}
        className="text-4xl cursor-pointer"
        flex="justify-center"
      />
      <TagsRating />
      <TextComment />
    </>
  );
}

export default ProductReviews;

const Avatar = ({ src, className, size = "normal" }) => {
  const classes = {
    size: {
      small: "max-w-[35px]",
      normal: "max-w-[45px]",
      large: "max-w-[55px]",
    },
  };
  return (
    <img
      className={`rounded-full ${classes.size[size]} ${className} `}
      src={
        src ||
        "https://www.pngkey.com/png/detail/202-2024792_user-profile-icon-png-download-fa-user-circle.png"
      }
      alt=""
    />
  );
};
