import { useDispatch, useSelector } from "react-redux";
import {
  selectedStarRatingIndexSelector,
  selectedTagsRatingSelector,
  UPDATE_SELECTED_TAGS_RATING,
} from "../../../../features/ratingSlice";

const TagsRating = () => {
  const dispatch = useDispatch();
  const currentStarRatingIndex = useSelector(selectedStarRatingIndexSelector);
  const selectedTagsRating = useSelector(selectedTagsRatingSelector);

  const selectedIndexList = Object.keys(selectedTagsRating);

  const handleTagsRating = (review, index) => {
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
                onClick={() => handleTagsRating(tagRating, index)}
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

export const TagRatingItem = ({
  children,
  className,
  onClick=false,
  size,
  style = {},
}) => {
  const classes = {
    size: {
      small: "py-1 px-2 text-xs",
      normal: "py-2 px-3 text-base",
      large: "py-3 px-4 text-xl",
    },
  };
  return (
    <p
      style={style}
      onClick={() => onClick&&onClick()}
      className={` ${classes.size[size]} ${className} mr-3 rounded-3xl border border-border  `}
    >
      {children}
    </p>
  );
};


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
