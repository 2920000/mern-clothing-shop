import { isOpenSelector } from "../../features/searchSlice";
import { useSelector } from "react-redux";
import HeaderLeft from "./HeaderLeft.js/HeaderLeft";
import HeaderRight from "./HeaderRight";
import Search from "../Search/Search";
import HeaderCenter from "./HeaderCenter";

function Header() {
  return (
    <MainHeader>
      <HeaderContent />
    </MainHeader>
  );
}
const MainHeader = (props) => {
  const isOpen = useSelector(isOpenSelector);
  return (
    <div
      style={isOpen ? { backgroundColor: "black" } : {}}
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
  const isOpen = useSelector(isOpenSelector);
  if (isOpen) {
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
