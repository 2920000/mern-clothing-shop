import { useLayoutEffect, useRef } from "react";
import { GoThreeBars } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { userSelector } from "../../features/accountSlice";
import {
  CLOSE_MOBILE_NAV,
  isMobileNavOpeningSelector,
  OPEN_MOBILE_NAV,
  OPEN_SEARCH_HEADER,
} from "../../features/headerSlice";
import { removeLocalStorage } from "../../helper";
import { useEventListener, useHover } from "../../hooks";
import MobileNav from "../Navigation/Mobile/MobileNav";

const HeaderLeft = () => {
  const dispatch = useDispatch();
  const pathParms = useLocation().pathname;

  useEventListener("resize", (event) => {
    if (event.target.innerWidth > 799) {
      dispatch(CLOSE_MOBILE_NAV());
    }
  });

  if (pathParms === "/checkout") {
    return <></>;
  }
  return (
    <div className=" flex grow items-center max-w-[33.33%]  ">
      <User />
      <IoIosSearch
        onClick={() => dispatch(OPEN_SEARCH_HEADER())}
        className="text-[2rem] cursor-pointer hidden lg:block"
      />
      <MobileMenuToggleIcon />
      <MobileNav />
    </div>
  );
};

export default HeaderLeft;

const User = () => {
  const user = useSelector(userSelector);

  if (user) {
    return <UserExisting user={user} />;
  }
  return (
    <Link to="/account/login">
      <VscAccount className="text-[1.75rem] font-thin mr-5 cursor-pointer hidden lg:block" />
    </Link>
  );
};
const MobileMenuToggleIcon = () => {
  const dispatch = useDispatch();
  const isMobileNavOpening = useSelector(isMobileNavOpeningSelector);

  const handleShowNav = () => {
    if (isMobileNavOpening) {
      dispatch(CLOSE_MOBILE_NAV());
    } else {
      dispatch(OPEN_MOBILE_NAV());
    }
  };

  return (
    <div onClick={handleShowNav}>
      {isMobileNavOpening ? (
        <IoClose className="text-[2.5rem] animate-opacity cursor-pointer lg:hidden " />
      ) : (
        <GoThreeBars className="text-[2rem] animate-opacity cursor-pointer block lg:hidden" />
      )}
    </div>
  );
};

const UserExisting = () => {
  const navigate = useNavigate();
  const userFeatureRef = useRef();
  const [userExistingRef, hovered] = useHover();

  const featureUser = featureUserList();

  useLayoutEffect(() => {
    userFeatureRef.current.classList.add("animate-opacity");
  }, [hovered]);

  const handleNavigate = (link) => {
    if (link) {
      navigate(link);
    } else {
      removeLocalStorage("profile");
      window.location.reload();
      navigate("/");
    }
  };

  return (
    <div className="relative">
      <div
        ref={userExistingRef}
        className="hidden lg:flex items-center mr-5 text-sm cursor-pointer"
      >
        <img
          className="rounded-full w-8 "
          src="https://www.pngkey.com/png/detail/202-2024792_user-profile-icon-png-download-fa-user-circle.png"
          alt=""
        />
        <ul
          style={{ display: hovered ? "block" : "none" }}
          ref={userFeatureRef}
          className={`absolute text-[0.95rem] rounded-sm top-[calc(100%+8px)] left-[-12px] shadow-[0px_2px_5px_1px_rgba(0,0,0,0.4)] bg-white z-30`}
        >
          <span className="absolute block w-full h-5 top-[-20px]"></span>
          <span className="absolute w-8 h-5 bg-white z-[-1] rotate-45 top-[-1px] left-[16px] "></span>
          {featureUser.map((e, index) => (
            <li
              onClick={() => {
                handleNavigate(e.link);
              }}
              className="py-2.5 px-4 text-sm whitespace-nowrap z-20 text-light_black cursor-pointer hover:text-black"
              key={index}
            >
              {e.displayName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export const featureUserList = () => {
  return [
    {
      displayName: "Tài Khoản Của Tôi",
      link: "user/profile",
    },
    {
      displayName: "Đơn Mua",
      link: "user/purchase",
    },
    {
      displayName: "Đăng Xuất",
    },
  ];
};
