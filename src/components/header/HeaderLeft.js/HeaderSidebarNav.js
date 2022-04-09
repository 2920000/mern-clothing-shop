import { useState } from "react";

const HeaderSidebarNav = ({ resizeToggle }) => {
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

export default HeaderSidebarNav;

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
    </div>
  );
};

const HeaderSidebarNavChildItem = ({navChild }) => {
  return (
    <p className="py-2">
      <a className="block w-full" href={navChild.link}>
        {navChild.displayName}
      </a>
    </p>
  );
};
