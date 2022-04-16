import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../features/accountSlice";
import { isReviewModalOpeningSelector, OPEN_REVIEW_MODAL } from "../../features/reviewSlice";
import { caculateSale } from "../../helper/caculateSale";
import { convertToPrice } from "../../helper/converToPrice";
import { useGetOrderedQuery } from "../../services/orderedApi";
import ReviewModal from "../../modal/ReviewModal";
import Button from "../../components/Button/Button";

function Purchase() {
  const dispatch=useDispatch()
  const user = useSelector(userSelector);
  const isReviewModalOpening=useSelector(isReviewModalOpeningSelector)
  let { data, isLoading, refetch, isError } = useGetOrderedQuery(user._id);
  const [orderWantToReview, setOrderWantToReView] = useState({});
  const [reviewed,setReviewed]=useState({})

  const handleShowReviewBox = (order,reviewed) => {
    dispatch(OPEN_REVIEW_MODAL())
    setOrderWantToReView(order);
    setReviewed(reviewed)
  };
  
  useEffect(() => {
    refetch();
  },[isReviewModalOpening]);

  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <>Something wrong</>;
  }


  // let newData=[...data]
  // newData=newData.sort((a,b) => Date.parse(b.date) - Date.parse(a.date))
  return (
    <div>
      {data.orders.map((order) => (
        <div className="bg-white  mb-4 p-2 md:p-7">
          <div className="flex relative justify-between items-center py-3 border-b border-border">
            <div className="flex">
              <div className="max-w-[80px] flex px-2 border border-border">
                <img className="w-full" src={order.image} alt="" />
              </div>
              <div className="flex text-sm md:text-base flex-col ml-5">
                <span className="">{order.title}</span>
                <span className="text-sm">Size: {order.size}</span>
                <span className="text-sm">Số lượng: {order.amount}</span>
              </div>
            </div>
            <div className=" absolute right-0 bottom-0 md:relative text-sm whitespace-nowrap ">
              <span
                className={
                  order.sale > 0 &&
                  "line-through text-light_grey inline-block mr-2"
                }
              >
                {convertToPrice(order.price)}đ
              </span>
              <span className="">
                {order.sale > 0 &&
                  convertToPrice(caculateSale(order) / order.amount) + "đ"}
              </span>
            </div>
          </div>
          <div>
            <div className="text-right my-3 md:my-6 flex items-center justify-end ">
              <p className=" inline text-sm mr-2">Tổng số tiền:</p>
              <span className=" text-sm md:text-xl lg:text-2xl">
                {convertToPrice(caculateSale(order))}đ
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs">
              Đơn hàng sẽ được chuẩn bị và chuyển đi trước
              <span className="ml-2 underline">{formatDate(order.date)}</span>
            </p>
            {data.productsReviewed.some(
              (productReviewed) => productReviewed._id === order._id
            ) ? (
              <Button variant='third' onClick={()=>handleShowReviewBox(order,data.productsReviewed.find(productReviewed=>productReviewed._id===order._id).review)} >Xem đánh giá</Button>
            ) : (
              <Button variant='primary' className='min-w-[130px] rounded-sm hover:opacity-80 ' onClick={()=>handleShowReviewBox(order)} >Đánh giá</Button>
             
            )}
          </div>
        </div>
      ))}
      {isReviewModalOpening && (
        <ReviewModal
          orderWantToReview={orderWantToReview}
          reviewed={reviewed}
        />
      )}
    </div>
  );
}

export default Purchase;

const formatDate = (date) => {
  let newDate = date.slice(0, 10);
  let dateNumberArray = newDate.split("-");
  let day = Number(dateNumberArray[1]) + 3;
  let month = dateNumberArray[2];
  let year = dateNumberArray[0];

  return `${day}-${month}-${year}`;
};
