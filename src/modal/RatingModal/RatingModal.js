import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_RATING_DATA,
  CLOSE_RATING_MODAL,
  isCreateRatingSuccesSelector,
  isLoadingSelector,
} from "../../features/ratingSlice";
import useClickOutside from "../../hooks/useClickOutside";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import StarRating from "./StarRating";
import TagsRating from "./TagsRating";
import TextComment from "./TextComment";
import ButtonRating from "./ButtonRating";
import Loading from "../../components/Loading";
import ProductRatings from "../../pages/ProductDetail/ProductRatings";

function RatingModal({ orderInfor}) {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
  const isCreateRatingSuccess = useSelector(isCreateRatingSuccesSelector);
  const reviewBoxRef = useRef();

  useLockBodyScroll();
  useClickOutside(reviewBoxRef, () => {
    dispatch(CLOSE_RATING_MODAL());
  });

  useEffect(() => {
    return () => {
      dispatch(CLEAR_RATING_DATA());
    };
  }, []);

  useEffect(() => {
    isCreateRatingSuccess && dispatch(CLOSE_RATING_MODAL());
  }, [isCreateRatingSuccess]);

  return ReactDOM.createPortal(
    <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.4)]">
      <div
        ref={reviewBoxRef}
        className="min-w-[600px] max-w-[700px] bg-white rounded-sm p-7"
      >
        <h3 className="text-xl mb-5">Đánh Giá Sản Phẩm</h3>
        <OrderInfor orderInfor={orderInfor} />
        <StarRating />
        <TagsRating />
        <TextComment />
        <ButtonRating orderInfor={orderInfor} />
        {isLoading && <Loading />}
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default RatingModal;

const ProductRated = ({ productRated }) => {
  return <ProductRatings productRated={productRated} />;
};
const OrderInfor = ({ orderInfor }) => {
  return (
    <div className="flex mb-3">
      <img className="max-w-[50px] mr-3" src={orderInfor.image} alt="" />
      <div className="text-sm">
        <p>{orderInfor.title}</p>
        <span>Size: {orderInfor.size}</span>
      </div>
    </div>
  );
};
