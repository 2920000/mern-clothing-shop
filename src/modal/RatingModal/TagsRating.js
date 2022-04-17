import { useDispatch, useSelector } from "react-redux";
import { selectedStarRatingIndexSelector, selectedTagsRatingSelector, UPDATE_SELECTED_TAGS_RATING } from "../../features/ratingSlice";

const TagsRating = () => {
  const dispatch = useDispatch();
  const currentStarRatingIndex = useSelector(selectedStarRatingIndexSelector);
  const selectedTagsRating = useSelector(
    selectedTagsRatingSelector
  );

  const selectedIndexList = Object.keys(selectedTagsRating);

  const handleSelectAvailableReviews = (review, index) => {
    const isExistingReview = selectedTagsRating[index];
    if (isExistingReview) {
      const selectedAvailableReviewsCopy = { ...selectedTagsRating };
      delete selectedAvailableReviewsCopy[index];
      dispatch(
        UPDATE_SELECTED_TAGS_RATING({ ...selectedAvailableReviewsCopy })
      );
    } else {
      dispatch(
        UPDATE_SELECTED_TAGS_RATING({
          [index]: review,
          ...selectedTagsRating,
        })
      );
    }
  };

  return (
    <div>
      {tagsRatingList.map((tagsRatingItem, index) => (
        <div className="flex justify-center gap-5 flex-wrap max-w-[500px ]">
          {index === currentStarRatingIndex &&
            tagsRatingItem.map((tagRating, index) => (
              <p
                style={
                  selectedIndexList.includes(`${index}`)
                    ? { borderColor: "red", color: "red" }
                    : {}
                }
                onClick={() => handleSelectAvailableReviews(tagRating, index)}
                className="py-2 px-3 cursor-pointer rounded-3xl border border-border text-sm"
              >
                {tagRating}
              </p>
            ))}
        </div>
      ))}
    </div>
  );
};
export default TagsRating;


const tagsRatingList = [
    [
      "Chất lượng sản phẩm rất kém",
      "Đóng gói sản phẩm rất kém",
      "Shop phục vụ kém",
      "Rất không đáng tiền",
      "Thời gian giao hàng rất chậm",
    ],
    [
      "Chất lượng sản phẩm kém",
      "Đóng gói sản phẩm kém",
      "Shop phục vụ kém",
      "Không đáng tiền",
      "Thời gian giao hàng chậm",
    ],
    [
      "Sản phẩm tạm chấp nhậm được",
      "Đóng gói sản phẩm tạm được ",
      "Shop phục vụ tạm được",
      "Giá cả chấp nhận được",
      "Thời gian giao hàng tạm được",
    ],
    [
      "Chất lượng sản phẩm tốt",
      "Đóng gói sản phẩm chắc chắn",
      "Shop phục vụ khá tốt",
      "Đáng đồng tiền",
      "Thời gian giao hàng nhanh",
    ],
    [
      "Chất lượng sản phẩm tuyệt vời",
      "Đóng gói sản phẩm rất đẹp và chắc chắn",
      "Shop phục vụ tốt",
      "Rất đáng tiền",
      "Thời gian giao hàng nhanh",
    ],
  ];