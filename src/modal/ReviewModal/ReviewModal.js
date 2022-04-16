import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import {
  addReviewToDatabase,
  CLEAR_REVIEW_DATA,
  CLOSE_REVIEW_MODAL,
  isCreateReviewSuccesSelector,
  isLoadingSelector,
  reviewTextSelector,
  selectedAvailableReviewsSelector,
  selectedStarIndexSelector,
  UPDATE_REVIEW_TEXT,
  UPDATE_SELECTED_AVAILABLE_REVIEWS,
  UPDATE_STAR_INDEX,
} from "../../features/reviewSlice";
import useClickOutside from "../../hooks/useClickOutside";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import availableReviewsList from "./availableReviewsList";
import Button from "../../components/Button/Button";
import { userSelector } from "../../features/accountSlice";
import IsOrderingLoading from "../../components/loading/IsOrderingLoading";
import { ReviewItem } from "../../pages/ProductDetail/ProductReviews/ProductReviews";

function ReviewModal({ orderWantToReview, reviewed }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
  const isCreateReviewSuccess = useSelector(isCreateReviewSuccesSelector);
  const reviewBoxRef = useRef();

  useLockBodyScroll();
  useClickOutside(reviewBoxRef, () => {
    dispatch(CLOSE_REVIEW_MODAL());
  });

  useEffect(() => {
    return () => {
      dispatch(CLEAR_REVIEW_DATA());
    };
  }, []);

  useEffect(() => {
    isCreateReviewSuccess && dispatch(CLOSE_REVIEW_MODAL());
  }, [isCreateReviewSuccess]);

  return ReactDOM.createPortal(
    <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.4)]">
      <div
        ref={reviewBoxRef}
        className="min-w-[600px] max-w-[700px] bg-white rounded-sm p-7"
      >
        <h3 className="text-xl mb-5">Đánh Giá Sản Phẩm</h3>
        <OrderWantToReviewInfor orderWantToReview={orderWantToReview} />
        {reviewed.userInfor ? (
          <Reviewed reviewed={reviewed}/>
        ) : (
          <div>
            <ReviewStars />
            <AvailableReviews />
            <ReviewTextarea />
            <ReviewButton orderWantToReview={orderWantToReview} />
          </div>
        )}
        {isLoading && <IsOrderingLoading />}
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default ReviewModal;

const Reviewed=({reviewed})=>{
  return <ReviewItem review={reviewed}/>
}
const OrderWantToReviewInfor = ({ orderWantToReview }) => {
  return (
    <div className="flex mb-3">
      <img className="max-w-[50px] mr-3" src={orderWantToReview.image} alt="" />
      <div className="text-sm">
        <p>{orderWantToReview.title}</p>
        <span>Size: {orderWantToReview.size}</span>
      </div>
    </div>
  );
};

const ReviewStars = () => {
  const dispatch = useDispatch();
  const currentStarIndex = useSelector(selectedStarIndexSelector);

  const handleReviewWithStar = (starIndex) => {
    dispatch(UPDATE_STAR_INDEX(starIndex));
    dispatch(UPDATE_SELECTED_AVAILABLE_REVIEWS({}));
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
            {index <= currentStarIndex && (
              <AiFillStar className="absolute top-0 text-4xl text-orange-400 cursor-pointer" />
            )}
          </div>
        ))}
    </div>
  );
};

const AvailableReviews = () => {
  const dispatch = useDispatch();
  const currentStarIndex = useSelector(selectedStarIndexSelector);
  const selectedAvailableReviews = useSelector(
    selectedAvailableReviewsSelector
  );

  const selectedIndexList = Object.keys(selectedAvailableReviews);

  const handleSelectAvailableReviews = (review, index) => {
    const isExistingReview = selectedAvailableReviews[index];
    if (isExistingReview) {
      const selectedAvailableReviewsCopy = { ...selectedAvailableReviews };
      delete selectedAvailableReviewsCopy[index];
      dispatch(
        UPDATE_SELECTED_AVAILABLE_REVIEWS({ ...selectedAvailableReviewsCopy })
      );
    } else {
      dispatch(
        UPDATE_SELECTED_AVAILABLE_REVIEWS({
          [index]: review,
          ...selectedAvailableReviews,
        })
      );
    }
  };

  return (
    <div>
      {availableReviewsList.map((reviewsListFollowByStar, index) => (
        <div className="flex justify-center gap-5 flex-wrap max-w-[500px ]">
          {index === currentStarIndex &&
            reviewsListFollowByStar.map((review, index) => (
              <p
                style={
                  selectedIndexList.includes(`${index}`)
                    ? { borderColor: "red", color: "red" }
                    : {}
                }
                onClick={() => handleSelectAvailableReviews(review, index)}
                className="py-2 px-3 cursor-pointer rounded-3xl border border-border text-sm"
              >
                {review}
              </p>
            ))}
        </div>
      ))}
    </div>
  );
};

const ReviewTextarea = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <textarea
        name="review"
        onChange={(e) => dispatch(UPDATE_REVIEW_TEXT(e.target.value))}
        className="w-full text-sm border-[1px] mb-5 border-border outline-none resize-none p-4 focus:border-[1px] focus:border-black transition-all duration-300   mt-5 min-h-[120px]"
      ></textarea>
    </div>
  );
};

const ReviewButton = ({ orderWantToReview }) => {
  const dispatch = useDispatch();
  const currentStarIndex = useSelector(selectedStarIndexSelector);
  const selectedAvailableReviews = useSelector(
    selectedAvailableReviewsSelector
  );
  const reviewText = useSelector(reviewTextSelector);
  const user = useSelector(userSelector);

  const handleSubmitReview = () => {
    const reviewData = {
      userInfor: user,
      review: {
        productInfor: {
          _id: orderWantToReview._id,
          productId: orderWantToReview.productId,
          size: orderWantToReview.size,
        },
        reviewStar: currentStarIndex + 1,
        selectedAvailableReviews: Object.values(selectedAvailableReviews),
        reviewText,
      },
    };
    dispatch(addReviewToDatabase(reviewData));
  };
  return (
    <div className="flex items-center justify-end">
      <Button
        variant="secondary"
        onClick={() => dispatch(CLOSE_REVIEW_MODAL())}
        className="mr-2 "
      >
        Trở lại
      </Button>
      <Button
        disabled={currentStarIndex > -1 ? false : true}
        onClick={handleSubmitReview}
        className="rounded-sm"
      >
        Hoàn thành
      </Button>
    </div>
  );
};
