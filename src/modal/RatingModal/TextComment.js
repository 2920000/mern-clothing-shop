import { useDispatch } from "react-redux";
import {UPDATE_TEXT_COMMENT } from "../../features/ratingSlice";

const TextComment = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <textarea
        name="review"
        onChange={(e) => dispatch(UPDATE_TEXT_COMMENT(e.target.value))}
        className="w-full text-sm border-[1px] mb-5 border-border outline-none resize-none p-4 focus:border-[1px] focus:border-black transition-all duration-300   mt-5 min-h-[120px]"
      ></textarea>
    </div>
  );
};
export default TextComment;
