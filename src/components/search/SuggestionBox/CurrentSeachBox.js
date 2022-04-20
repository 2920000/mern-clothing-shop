import { getLocalStorage } from "../../../helper";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CLOSE_SEARCH_HEADER } from "../../../features/headerSlice";
const CurrentSearchBox = () => {
  const dispatch = useDispatch();
  const dataFromLocalStorage = getLocalStorage("currentSearch");

  return (
    <>
      <span className="font-medium text-[#a9a9a9] tracking-wider mb-3 px-3 block">
        Tìm kiếm gần đây
      </span>
      {dataFromLocalStorage.map((e, index) => (
        <Link
          onClick={() => dispatch(CLOSE_SEARCH_HEADER())}
          to={`/products/${e.slug}`}
          className="font-bold block list-none px-3 text-light_grey py-2 text-sm cursor-pointer hover:bg-gray-100 "
          key={index}
        >
          {e.title}
        </Link>
      ))}
    </>
  );
};

export default CurrentSearchBox;
