import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { userSelector } from "../../features/accountSlice";
import {
  addRatingToDatabase,
  CLOSE_RATING_MODAL,
  commnetTextSelector,
  selectedStarRatingIndexSelector,
  selectedTagsRatingSelector,
} from "../../features/ratingSlice";
import { useGetOrderedQuery } from "../../services/orderedApi";
import { PopupFormFooter } from "../reuseModalStructure";

function RatingModalFooter({ orderInfor }) {
  const dispatch = useDispatch();
  const currentStarRatingIndex = useSelector(selectedStarRatingIndexSelector);
  const selectedTagsRating = useSelector(selectedTagsRatingSelector);
  const commentText = useSelector(commnetTextSelector);
  const user = useSelector(userSelector);
  let { data } = useGetOrderedQuery(user._id);
  const productRating = data?.productRatings.find(
    (productRating) => productRating._id === orderInfor._id
  );

  const handleSubmitRating = () => {
    const ratingData = {
      userInfor: user,
      rating: {
        productRatingInfor: {
          _id: orderInfor._id,
          productId: orderInfor.productId,
          size: orderInfor.size,
        },
        starRating: currentStarRatingIndex + 1,
        tagsRating: Object.values(selectedTagsRating),
        commentText,
      },
    };
    dispatch(addRatingToDatabase(ratingData));
  };
  if (productRating) {
    return (
      <div className="flex justify-end">
        <Button
          onClick={() => dispatch(CLOSE_RATING_MODAL())}
          variant="third"
          className="min-w-[130px]"
        >
          OK
        </Button>
      </div>
    );
  }
  return (
    <PopupFormFooter>
      <div className="flex items-center justify-end">
        <Button
          variant="secondary"
          onClick={() => dispatch(CLOSE_RATING_MODAL())}
          className="mr-2 "
        >
          Trở lại
        </Button>
        <Button
          disabled={currentStarRatingIndex > -1 ? false : true}
          onClick={handleSubmitRating}
          className="rounded-sm"
        >
          Hoàn thành
        </Button>
      </div>
    </PopupFormFooter>
  );
}

export default RatingModalFooter;
