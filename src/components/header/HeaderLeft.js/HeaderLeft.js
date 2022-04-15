import { useRef, useState } from "react";
import { GoThreeBars } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSelector } from "../../../features/accountSlice";
import { removeLocalStorage } from "../../../helper/localStoragefunction";
import { useLocation } from "react-router-dom";
import useHover from "../../../hooks/useHover";
import { openSearchHeader } from "../../../helper";
import useEventListener from "../../../hooks/useEventListener";
import SidebarMobileNav from "./SidebarMobileNav";

const HeaderLeft = () => {
  const dispatch = useDispatch();
  const [toggleMobileNav, setToggleMobileNav] = useState(true);
  const pathParms = useLocation().pathname;

  useEventListener("resize", (event) => {
    if (event.target.innerWidth > 799) {
      setToggleMobileNav(false);
    } else {
      setToggleMobileNav(true);
    }
  });

  if (pathParms === "/checkout") {
    return <></>;
  }
  return (
    <div className=" flex grow items-center max-w-[33.33%]  ">
      <User />
      <IoIosSearch
        onClick={() => openSearchHeader(true, dispatch)}
        className="text-[2rem] cursor-pointer hidden lg:block"
      />
      <MobileMenuToggleIcon />
      <SidebarMobileNav toggleMobileNav={toggleMobileNav} />
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
  const [opacityNavIconClose, setOpacityNavIconClose] = useState("0");
  const [opacityNavIconBar, setOpacityNavIconBar] = useState("1");
  const [toggleSidebarNav, setToggleSidebarNav] = useState(false);

  const handleShowNav = () => {
    setToggleSidebarNav(!toggleSidebarNav);
    const sidebarNavElement = document.querySelector("#sidebar-nav");
    if (!toggleSidebarNav) {
      sidebarNavElement.style.left = "0";
      document.body.style.overflowY = "hidden";
      setTimeout(() => {
        setOpacityNavIconClose("1");
        setOpacityNavIconBar("0");
      }, 200);
    } else {
      sidebarNavElement.style.left = "-100%";
      document.body.style.overflowY = "auto";
      setTimeout(() => {
        setOpacityNavIconBar("1");
        setOpacityNavIconClose("0");
      }, 200);
    }
  };

  return (
    <>
      {toggleSidebarNav ? (
        <IoClose
          onClick={handleShowNav}
          style={toggleSidebarNav && { opacity: opacityNavIconClose }}
          className="text-[2.5rem]  opacity-0 transition-all duration-200 cursor-pointer lg:hidden "
        />
      ) : (
        <GoThreeBars
          style={!toggleSidebarNav && { opacity: opacityNavIconBar }}
          onClick={handleShowNav}
          className="text-[2rem] opacity-0 transition-all duration-200 cursor-pointer block lg:hidden"
        />
      )}
    </>
  );
};

const UserExisting = () => {
  const navigate = useNavigate();
  const userFeatureRef = useRef();
  const mouseout = () => {
    userFeatureRef.current.style.opacity = "0";
  };
  const mouseover = () => {
    setTimeout(() => {
      userFeatureRef.current.style.opacity = "1";
    }, 0);
  };
  const [userExistingRef, hovered] = useHover({
    animation: true,
    mouseout,
    mouseover,
  });
  const featureUser = featureUserList();
  const handleNavigate = (link) => {
    if (link) {
      navigate(link);
    } else {
      removeLocalStorage("profile");
      window.location.reload();
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
          style={hovered ? { display: "block" } : { display: "none" }}
          ref={userFeatureRef}
          className={`absolute text-[0.95rem] rounded-sm  opacity-0 top-[calc(100%+8px)] left-[-12px] transition-opacity duration-150 shadow-[0px_2px_5px_1px_rgba(0,0,0,0.4)] bg-white z-30`}
        >
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
