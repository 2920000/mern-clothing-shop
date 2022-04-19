import { FiChevronDown } from "react-icons/fi";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSelector } from "../../../features/accountSlice";
import {
  CLOSE_MOBILE_NAV,
  isMobileNavOpeningSelector,
} from "../../../features/headerSlice";
import mobileNavList from "./mobileNavList";
const MobileNav = () => {
  const dispatch = useDispatch();
  const isMobileNavOpening = useSelector(isMobileNavOpeningSelector);
  const [mobileNavActive, setMobileNavActive] = useState(0);
  const user = useSelector(userSelector);

  const handleChangeNavItem = (index) => {
    setMobileNavActive(index);
  };
  const mobileNavSidebarStyle = {
    left: isMobileNavOpening ? "0" : "-100%",
  };

  useLayoutEffect(() => {
    document.body.style.overflowY = `${isMobileNavOpening ? "hidden" : "auto"}`;
  }, [isMobileNavOpening]);

  return (
    <div
      style={mobileNavSidebarStyle}
      className={`absolute top-[calc(100%-1px)] left-[-100%] transition-all duration-150  bg-white  z-40 w-full h-screen`}
    >
      <MobileNavMenu>
        {mobileNavList.map((navItem, index) => (
          <div className="w-full">
            <MobileNavItem
              className={` ${
                mobileNavActive === index &&
                "after:h-[3px] after:w-full after:bg-black after:absolute after:bottom-0"
              }`}
              onClick={() => handleChangeNavItem(index)}
            >
              {navItem.mobileNavName}
            </MobileNavItem>
            <MobileMenu
              className={`${mobileNavActive === index ? "block" : "hidden"}`}
            >
              {navItem.mobileMenu.map((mobileMenuItem) => (
                <MobileMenuItem>
                  <Link
                    onClick={() => dispatch(CLOSE_MOBILE_NAV())}
                    to={mobileMenuItem.link}
                  >
                    {mobileMenuItem.displayName}
                  </Link>
                </MobileMenuItem>
              ))}

              {user ? (
                <MobileAccountNav />
              ) : (
                <MobileMenuItem>
                  <Link
                    onClick={() => dispatch(CLOSE_MOBILE_NAV())}
                    to="/account/login"
                  >
                    Đăng nhập
                  </Link>
                </MobileMenuItem>
              )}
            </MobileMenu>
          </div>
        ))}
      </MobileNavMenu>
    </div>
  );
};

export default MobileNav;

const MobileNavMenu = ({ children }) => {
  return (
    <div className="flex relative border-y border-[#F1F1F1]">{children}</div>
  );
};
const MobileNavItem = ({ children, onClick, className = "" }) => {
  return (
    <div
      onClick={onClick}
      className={`${className} relative cursor-pointer py-2.5 text-lg text-light_black font-normal flex justify-center items-center`}
    >
      {children}
    </div>
  );
};
const MobileMenu = ({ children, className = "" }) => {
  return (
    <div className={`${className} absolute w-full left-0 py-2 `}>
      {children}
    </div>
  );
};
const MobileMenuItem = ({ children, onClick, className = "" }) => {
  return (
    <div
      onClick={onClick}
      className={`${className} py-2 px-5 cursor-pointer text-sm`}
    >
      {children}
    </div>
  );
};

const MobileAccountNav = () => {
  const dispatch = useDispatch();
  const [toggleSubMenu, setToggleSubMenu] = useState(false);
  const userFeatureList = [
    {
      displayName: "Tài khoản của tôi",
      link: "",
    },
    {
      displayName: "Đơn mua",
      link: "/user/purchase",
    },
    {
      displayName: "Đăng xuất",
      link: "",
    },
  ];
  const mobileSubMenuStyle = {
    maxHeight: "0",
    overflow: "hidden",
  };
  const mobileMenuIconStyle = {
    transform: "rotate(360deg)",
  };
  const handleToggleSubMenu = () => {
    setToggleSubMenu(!toggleSubMenu);
  };
  return (
    <>
      <MobileMenuItem onClick={handleToggleSubMenu} className="">
        <div className="flex justify-between">
          Tài khoản
          <FiChevronDown
            style={toggleSubMenu ? mobileMenuIconStyle : {}}
            className="text-2xl rotate-180 transition-all duration-300 "
          />
        </div>
        <MobileSubMenu
          style={toggleSubMenu ? mobileSubMenuStyle : {}}
          className="transition-all duration-300  overflow-hidden max-h-[1000px]"
        >
          {userFeatureList.map((feature) => (
            <MobileSubMenuItem>
              <Link
                onClick={() => dispatch(CLOSE_MOBILE_NAV())}
                to={feature.link}
              >
                {feature.displayName}
              </Link>
            </MobileSubMenuItem>
          ))}
        </MobileSubMenu>
      </MobileMenuItem>
    </>
  );
};
const MobileSubMenu = ({ children, className = "", style = {} }) => {
  return (
    <div style={style} className={`${className} ml-5 `}>
      {children}
    </div>
  );
};
const MobileSubMenuItem = ({ children, className = "", style = {} }) => {
  return (
    <div style={style} className={`${className} cursor-pointer py-2.5`}>
      {children}
    </div>
  );
};
