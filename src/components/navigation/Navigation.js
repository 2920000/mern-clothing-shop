import React, {useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useHover from "../../hooks/useHover";
import navName from "./navName";
function Navigation() {
  const path = useLocation().pathname;
  if (path === "/checkout") {
    return <></>;
  }
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
  return <ul className="flex flex-wrap justify-center">{props.children}</ul>;
};
const NavItem = ({ e }) => {
  const navItemRef = useRef();
  const navBoxRef = useRef();
  const hovered = useHover(navItemRef, navBoxRef);
 
  return (
    <li
      ref={navItemRef}
      className="relative flex items-center mr-10 py-2.5 group font-medium cursor-pointer "
    >
      {e.name}
      <span
        style={hovered ? { left: 0, width: "100%" } : { right: 0, width: "0%" }}
        className=" block absolute top-[calc(100%-4px)] w-0 h-[2px] transition-all duration-[400ms]  bg-white "
      ></span>
      <ul
        ref={navBoxRef}
        style={hovered ? { display: "block" } : { display: "none" }}
        className={`absolute shadow-lg  transition-opacity duration-150 opacity-0 top-[100%] z-30 left-[-15px] bg-white text-black `}
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
      <Link
        to={`/collection/${e.params}`}
        className=" hover:opacity-70 block list-none whitespace-nowrap min-w-[120px] px-6 py-3 cursor-pointer font-normal"
      >
        {e.subName || e}
      </Link>
    </li>
  );
};
