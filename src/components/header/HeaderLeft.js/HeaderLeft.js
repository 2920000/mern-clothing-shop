import { useEffect, useRef, useState } from "react";
import { GoThreeBars } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSelector } from "../../../features/accountSlice";
import { removeLocalStorage } from "../../../helper/localStoragefunction";
import { useLocation } from "react-router-dom";
import useHover from "../../../hooks/useHover";
import HeaderSidebarNav from "./HeaderSidebarNav";
import { openSearchHeader } from "../../../helper";

const HeaderLeft = () => {
  const dispatch=useDispatch()
  const [resizeToggle, setResizeToggle] = useState(true);
  const path = useLocation().pathname;


  useEffect(() => {
    let event;
    event = window.addEventListener("resize", (event) => {
      if (event.target.innerWidth > 799) {
        setResizeToggle(false);
      } else {
        setResizeToggle(true);
      }
    });
    return () => window.removeEventListener("resize", event);
  });
  
  if (path === "/checkout") {
    return <></>;
  }
  return (
    <div className=" flex grow items-center max-w-[33.33%]  ">
      <User />
      <IoIosSearch
        onClick={()=>openSearchHeader(true,dispatch)}
        className="text-[2rem]  cursor-pointer hidden lg:block"
      />
      <MobileMenuToggleIcon />
      <HeaderSidebarNav resizeToggle={resizeToggle} />
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
    <a href="/account/login">
      <VscAccount className="text-[1.75rem] font-thin mr-5 cursor-pointer hidden lg:block" />
    </a>
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

const UserExisting = ({ user }) => {
  const navigate = useNavigate();
  const userFeatureRef = useRef();
  const userExistingRef = useRef();
  const hovered = useHover(userExistingRef, userFeatureRef);
  const featureUser = [
    {
      display: "Tài Khoản Của Tôi",
      link: "user/profile",
    },
    {
      display: "Đơn Mua",
      link: "user/purchase",
    },
    {
      display: "Đăng Xuất",
    },
  ];
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
        className="flex items-center mr-5 text-sm cursor-pointer"
      >
        <img
          className="rounded-full w-8 mr-2"
          src="https://www.pngkey.com/png/detail/202-2024792_user-profile-icon-png-download-fa-user-circle.png"
          alt=""
        />
        <span>{user.username}</span>
        <ul
          style={hovered ? { display: "block" } : { display: "none" }}
          ref={userFeatureRef}
          className={`absolute text-[0.95rem]  opacity-0 top-[calc(100%+8px)] left-[-12px] transition-opacity duration-150 shadow-lg bg-black z-30`}
        >
          <span className="absolute w-8 h-5 bg-black z-[-1] rotate-45 top-[-1px] left-[16px] "></span>
          {featureUser.map((e, index) => (
            <li
              onClick={() => {
                handleNavigate(e.link);
              }}
              className="py-2.5 px-5 whitespace-nowrap z-20 text-white cursor-pointer hover:bg-light_grey"
              key={index}
            >
              {e.display}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
