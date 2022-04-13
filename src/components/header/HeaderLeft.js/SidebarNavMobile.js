import { useState } from "react";
import { RiMapPinUserLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userSelector } from "../../../features/accountSlice";
import { FiChevronDown } from "react-icons/fi";
import { featureUserList } from "./HeaderLeft";
const SidebarNavMobile = ({ resizeToggle }) => {
  return (
    <div
      id="sidebar-nav"
      className={`absolute ${
        !resizeToggle && "hidden"
      } top-[calc(100%-1px)] left-[-100%] transition-all duration-200  bg-white  z-40 w-full h-screen`}
    >
      <HeaderSidebarNavParentsList />
    </div>
  );
};

export default SidebarNavMobile;

const HeaderSidebarNavParentsList = () => {
  const [active, setActive] = useState(0);
  const handleChangeNav = (index) => {
    setActive(index);
  };
  const navbar = [
    {
      parentTitle: "Nam",
      childTitle: [
        {
          displayName: "Hoodie nam",
          link: "/collection/mens-hoodie",
        },
        {
          displayName: "T-shirt nam",
          link: "/collection/mens-t-shirt",
        },
        {
          displayName: "Giảm giá",
          link: "/collection/mens-sale",
        },
      ],
    },
    {
      parentTitle: "Nữ",
      childTitle: [
        {
          displayName: "Hoodie nữ",
          link: "/collection/womens-hoodie",
        },
        {
          displayName: "T-shirt nữ",
          link: "/collection/womens-t-shirt",
        },
        {
          displayName: "Giảm giá",
          link: "/collection/womens-sale",
        },
      ],
    },
    {
      parentTitle: "Phụ kiện",
      childTitle: [
        {
          displayName: "Khẩu trang",
          link: "/collection/face-mask",
        },
      ],
    },
  ];
  return (
    <div className="flex relative border-y border-[#F1F1F1]">
      {navbar.map((nav, index) => (
        <>
          <HeaderSidebarNavParentsItem
            key={index}
            index={index}
            nav={nav}
            active={active}
            handleChangeNav={handleChangeNav}
          />
          <HeaderSidebarNavChildList active={active} index={index} nav={nav} />
        </>
      ))}
    </div>
  );
};

const HeaderSidebarNavParentsItem = ({
  index,
  active,
  nav,
  handleChangeNav,
}) => {
  return (
    <p
      onClick={() => {
        handleChangeNav(index);
      }}
      className={`w-[33.33%] relative ${
        index === active
          ? "after:h-[3px] after:w-full after:bg-black after:absolute after:bottom-0"
          : ""
      } cursor-pointer py-2.5 text-lg text-light_black font-normal ${
        index === 1 ? "border-x border-x-[#F1F1F1]" : ""
      } flex justify-center items-center`}
    >
      {nav.parentTitle}
    </p>
  );
};

const HeaderSidebarNavChildList = ({ active, index, nav }) => {
  return (
    <div
      className={` ${
        index === active ? "block " : "hidden"
      } absolute top-[calc(100%)] left-0 p-5 w-full`}
    >
      {nav.childTitle.map((navChild, index) => (
        <HeaderSidebarNavChildItem key={index} navChild={navChild} />
      ))}
      <MobileUser />
    </div>
  );
};

const HeaderSidebarNavChildItem = ({ navChild }) => {
  return (
    <p className="py-2">
      <Link className="flex items-center w-full" to={navChild.link}>
        {navChild.displayName}
      </Link>
    </p>
  );
};

const MobileUser = () => {
  const user = useSelector(userSelector);
  const [drop, setDrop] = useState(false);

  const featureUser = featureUserList();
  if (!user) {
    return <div>Đăng nhập</div>;
  }

  return (
    <div
      className={`flex py-2 flex-col cursor-pointer relative justify-center `}
    >
      <div
        onClick={() => setDrop(!drop)}
        className="w-full flex justify-between"
      >
        Tài khoản
        <FiChevronDown />
      </div>
      <div
        style={drop ? { maxHeight: "200px", overflow: "hidden" } : {}}
        className="flex flex-col overflow-hidden max-h-0  transition-[max-height] duration-300  top-full  "
      >
        <div className="ml-6">
          <div className="flex items-center">
            <RiMapPinUserLine className="text-lg mr-2" />
            {user.username}
          </div>
          {/* {featureUser.map((navChild) => (
            <HeaderSidebarNavChildItem navChild={navChild} />
          ))} */}
        </div>
      </div>
    </div>
  );
};
