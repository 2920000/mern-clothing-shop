import React, { useState } from "react";
import navName from "./navName";
function Navigation() {
  return (
    <div className="bg-black font-montserrat text-white hidden lg:block">
      <NavList>
        {navName.map((e, index) => (
          <NavItem e={e} key={index} />
        ))}
      </NavList>
    </div>
  );
}

export default Navigation;

const NavList = (props) => {
  return <ul className="flex justify-center">{props.children}</ul>;
};
const NavItem = ({ e }) => {
  const [navItem, setNavItem] = useState(false);

  const handleToggleNav = (e) => {
    e.type === "mouseenter" ? setNavItem(true) : setNavItem(false);
  };
  return (
    <li
      onMouseEnter={handleToggleNav}
      onMouseLeave={handleToggleNav}
      className="relative flex items-center mr-10 py-2.5 group font-medium cursor-pointer "
    >
      {e.name}
      <span
        style={navItem ? { left: 0, width: "100%" } : { right: 0, width: "0%" }}
        className=" block absolute top-[calc(100%-4px)] w-0 h-[2px] transition-all duration-[400ms]  bg-white "
      ></span>
      <ul
        className={`absolute ${
          navItem ? "block" : "hidden"
        } shadow-lg top-[100%] z-30 left-[-15px] bg-white text-black `}
      >
        {e.sub?.map((e, index) => (
          <SubItem key={index} e={e} />
        ))}
      </ul>
    </li>
  );
};
const SubItem = ({ e }) => {
  return (
    <li>
      <a
        href={`/collection/${e.params}`}
        className=" hover:opacity-70 block list-none whitespace-nowrap min-w-[120px] px-6 py-3 cursor-pointer font-normal"
      >
        {e.subName || e}
      </a>
    </li>
  );
};
