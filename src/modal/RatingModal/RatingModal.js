import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_RATING_DATA,
  CLOSE_RATING_MODAL,
  isLoadingSelector,
} from "../../features/ratingSlice";
import useClickOutside from "../../hooks/useClickOutside";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import RatingModalHeader from "./RatingModalHeader";
import RatingModalMain from "./RatingModalMain/RatingModalMain";
import RatingModalFooter from "./RatingModalFooter";
import Loading from "../../components/Loading/Loading";

function RatingModal({ orderInfor }) {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
  const reviewBoxRef = useRef();

  useLockBodyScroll();
  useClickOutside(reviewBoxRef, () => {
    dispatch(CLOSE_RATING_MODAL());
  });

  useEffect(() => {
    return () => {
      dispatch(CLEAR_RATING_DATA());
    };
  },[]);


  return ReactDOM.createPortal(
    <div className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.4)]">
      <div
        ref={reviewBoxRef}
        className="min-w-[600px] max-w-[700px] bg-white rounded-sm p-7"
      >
        <RatingModalHeader />
        <RatingModalMain orderInfor={orderInfor} />
        <RatingModalFooter orderInfor={orderInfor} />
        {isLoading&&<Loading/>}
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default RatingModal;


