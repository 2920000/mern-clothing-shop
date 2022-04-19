import { IoIosArrowRoundForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { ImSad2 } from "react-icons/im";
import { currentProductsBySearchSelector, isLoadingSelector } from "../../../features/headerSlice";
import { SearchSkeleton } from "../../skeleton";
import SearchItem from "./SearchItem";

const SearchBox = () => {
  const currentProductsBySearch = useSelector(currentProductsBySearchSelector);
  const isLoading = useSelector(isLoadingSelector);

  if (isLoading) {
    return <SearchSkeleton/>;
  }
  if (currentProductsBySearch.length === 0) {
    return <NotFoundProduct />;
  }
  return (
    <>
      <h3 className="mb-4">Sản phẩm</h3>
      <ul className="grid grid-cols-2 z-30 ">
        {currentProductsBySearch.slice(0, 6).map((product) => (
          <SearchItem key={product._id} product={product} />
        ))}
      </ul>
      <p className="text-center font-bold text-sm flex items-center justify-center mt-5 mb-2 cursor-pointer">
        Xem tất cả {currentProductsBySearch.length} sản phẩm{" "}
        <IoIosArrowRoundForward className="text-2xl ml-1" />
      </p>
    </>
  );
};
export default SearchBox;

const NotFoundProduct = () => {
  return (
    <div className="flex items-center justify-center mt-1">
      Xin lỗi, không thấy bất kỳ sản phẩm nào{" "}
      <ImSad2 className="ml-2 mt-[1px] text-red-500 text-red" />{" "}
    </div>
  );
};
