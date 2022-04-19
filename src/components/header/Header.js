import { useSelector } from "react-redux";
import HeaderRight from "./HeaderRight";
import Search from "../Search/Search";
import HeaderCenter from "./HeaderCenter";
import HeaderLeft from "./HeaderLeft";
import { isSearchHeaderOpeningSelector } from "../../features/headerSlice";

function Header() {
  return (
    <MainHeader>
      <HeaderContent />
    </MainHeader>
  );
}
const MainHeader = (props) => {
  const isSearchHeaderOpening = useSelector(isSearchHeaderOpeningSelector);
  return (
    <div
      style={isSearchHeaderOpening ? { backgroundColor: "black" } : {}}
      className={` relative border-b border-b-white border-t-[0.1px] border-t-light_grey transition-all duration-150 `}
    >
      <div
        className={`flex box-border max-w-[1336 px]  mx-auto px-8 h-[70px] lg:h-[90px] border-b border-black lg:border-0 items-center`}
      >
        {props.children}
      </div>
    </div>
  );
};
const HeaderContent = () => {
  const isSearchHeaderOpening = useSelector(isSearchHeaderOpeningSelector);

  if (isSearchHeaderOpening) {
    return <Search />;
  }
  return (
    <>
      <HeaderLeft />
      <HeaderCenter />
      <HeaderRight />
    </>
  );
};

export default Header;
