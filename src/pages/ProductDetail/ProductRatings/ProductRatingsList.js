import { Star } from "./ProductRatings";

const ProductRatingsList = ({ productRatingsList }) => {
  if (productRatingsList?.length === 0) {
    return (
      <div className="min-h-[500px] flex justify-center items-center">
        Chưa có đánh giá
      </div>
    );
  }
  return (
    <div className="px-5">
      {productRatingsList?.map((productRating, index) => (
        <ProductRatingItem productRating={productRating} key={index} />
      ))}
    </div>
  );
};
export default ProductRatingsList;

export const ProductRatingItem = ({ productRating }) => {
  return (
    <div className="flex border-b border-border py-6">
      <div className="mr-2">
        <img
          className="max-w-[40px] rounded-full "
          src="https://www.pngkey.com/png/detail/202-2024792_user-profile-icon-png-download-fa-user-circle.png"
          alt=""
        />
      </div>
      <div>
        <span className="text-xs">{productRating.userInfor.username}</span>
        <div className="flex items-center text-sm relative mt-1">
          <Star number={5} outline />
          <div className="flex absolute">
            <Star number={productRating.starRating} />
          </div>
        </div>
        <div className="my-4 text-xs">{productRating.created_at}</div>
        <p className="text-sm mb-2 ">{productRating.commentText}</p>
        <div className="flex  gap-3">
          {productRating.tagsRating.map((tagRating) => (
            <p className="p-1.5 px-3 text-sm rounded-3xl border border-border">
              {tagRating}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
