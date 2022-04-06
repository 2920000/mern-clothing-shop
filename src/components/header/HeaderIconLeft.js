import { useEffect, useRef, useState } from "react";
import { GoThreeBars } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSelector } from "../../features/accountSlice";
import { removeLocalStorage } from "../../helper/localStoragefunction";
import toggle from "../../helper/toggle";

const HeaderIconLeft = ({ setSearch, setBackgroundHeader }) => {
  const [toggleSidebarNav, setToggleSidebarNav] = useState(false);
  const [resizeToggle, setResizeToggle] = useState(true);
  const [opacityNavIconClose, setOpacityNavIconClose] = useState("0");
  const [opacityNavIconBar, setOpacityNavIconBar] = useState("1");
  const user = useSelector(userSelector);
  const handleSearch = () => {
    setSearch(false);
    setBackgroundHeader(true);
  };

  const handleShowNav = () => {
    setToggleSidebarNav(!toggleSidebarNav);
    const sidebarNavElement = document.querySelector("#sidebar-nav");
    if (!toggleSidebarNav) {
      sidebarNavElement.style.left = "0";
      document.body.style.overflowY='hidden'
      setTimeout(() => {
        setOpacityNavIconClose("1");
        setOpacityNavIconBar("0");
      }, 200);
    } else {
      sidebarNavElement.style.left = "-100%";
      document.body.style.overflowY='auto'
      setTimeout(() => {
        setOpacityNavIconBar("1");
        setOpacityNavIconClose("0");
      }, 200);
    }
  };

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
  return (
    <div className=" flex grow items-center max-w-[33.33%]  ">
      {user ? (
        <UserExisting user={user} />
      ) : (
        <a href="/account/login">
          <VscAccount className="text-[1.75rem] font-thin mr-5 cursor-pointer hidden lg:block" />
        </a>
      )}
      <IoIosSearch
        onClick={handleSearch}
        className="text-[2rem]  cursor-pointer hidden lg:block"
      />
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
      <SidebarNav resizeToggle={resizeToggle} />
    </div>
  );
};

export default HeaderIconLeft;

const SidebarNav = ({ resizeToggle }) => {
  const [active, setActive] = useState(0);
  const navbar = [
    {
      parentTitle: "Nam",
      childTitle: ["Tất cả nam"],
    },
    {
      parentTitle: "Nữ",
      childTitle: ["Tất cả nữ"],
    },
    {
      parentTitle: "Phụ kiện",
      childTitle: ["Tất cả phụ kiện"],
    },
  ];
  const handleChangeNav = (index) => {
    setActive(index);
  };
  return (
    <div
      id="sidebar-nav"
      className={`absolute ${
        !resizeToggle && "hidden"
      } top-[calc(100%-1px)] left-[-100%] transition-all duration-200  bg-white  z-40 w-full h-screen`}
    >
      <ul className="flex  relative border-y border-[#F1F1F1]">
        {navbar.map((nav, index) => (
          <li
            onClick={() => {
              handleChangeNav(index);
            }}
            className={`w-[33.33%] ${
              index === active ? "border-b-[3.5px] border-black" : ""
            } cursor-pointer py-2.5 text-lg text-light_black font-normal ${
              index === 1 ? "border-x border-x-[#F1F1F1]" : ""
            } flex justify-center items-center`}
            key={index}
          >
            {nav.parentTitle}
            <ul
              className={` ${
                index === active ? "block " : "hidden"
              } absolute top-[calc(100%)] left-0`}
            >
              {nav.childTitle.map((navChild, index) => (
                <li className="" key={index}>
                  {navChild}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

const UserExisting = ({ user }) => {
  const userFeatureRef = useRef();
  const timeout1Ref = useRef();
  const timeout2Ref = useRef();
  const navigate = useNavigate();
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

  const handleUserToggle = (e) => {
    toggle(e, timeout1Ref, timeout2Ref, userFeatureRef);
  };

  return (
    <div
      onMouseEnter={handleUserToggle}
      onMouseLeave={handleUserToggle}
      className="relative"
    >
      <span className="flex items-center mr-5 text-sm cursor-pointer">
        <img
          className="rounded-full w-8 mr-2"
          src="https://www.pngkey.com/png/detail/202-2024792_user-profile-icon-png-download-fa-user-circle.png"
          alt=""
        />
        <span>{user.username}</span>
      </span>
      <ul
        ref={userFeatureRef}
        className={`absolute opacity-0 top-[calc(100%+8px)] left-[-12px] transition-all duration-[300ms] shadow-lg bg-black z-30`}
      >
        <span className="absolute w-8 h-5 bg-black z-[-1] rotate-45 top-[-1px] left-[16px] "></span>
        {featureUser.map((e, index) => (
          <li
            onClick={() => {
              handleNavigate(e.link);
            }}
            className="py-2 px-5 whitespace-nowrap z-20 text-white cursor-pointer hover:bg-light_grey"
            key={index}
          >
            {e.display}
          </li>
        ))}
      </ul>
    </div>
  );
};
