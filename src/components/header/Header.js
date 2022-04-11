import { Link, useLocation } from "react-router-dom";
import { isOpenSelector } from "../../features/searchSlice";
import { useSelector } from "react-redux";
import HeaderLeft from "./HeaderLeft.js/HeaderLeft";
import HeaderRight from "./HeaderRight";
import Search from "../search/Search";
import image from "../../logo.png";

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
        className={`flex box-border max-w-[1272px]  mx-auto px-8 lg:px-2 h-[70px] lg:h-[90px] border-b border-black lg:border-0 items-center`}
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

const HeaderCenter = () => {
  const param = useLocation().pathname;

  return (
    <div
      style={param === "/checkout" ? { display: "block" } : {}}
      className="flex grow justify-center  max-w-[33.33%]"
    >
      <Link to="/" className="flex items-center">
        <img
          src={image}
          alt=""
          className="w-[45px] lg:w-[50px]  cursor-pointer "
        />
        {param === "/checkout" && (
          <p className="ml-4 flex items-center border-l border-black pl-4 min-h-[30px] text-lg">
            Thanh Toán
          </p>
        )}
      </Link>
    </div>
  );
};
