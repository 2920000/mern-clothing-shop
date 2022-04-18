import React, { useLayoutEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { GiNotebook } from "react-icons/gi";

function User() {

  return (
    <div className="bg-[#F5F5F5] h-full">
      <div className="max-w-[1272px] pt-5 flex flex-col lg:flex-row px-2 m-auto">
        <div className=" w-full lg:w-[20%]">
          <UserLeft />
        </div>
        <div className=" w-full lg:w-[80%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
const UserLeft = () => {
  const user = [
    // {
    //   title: "Tài khoản của tôi",
    //   link: "/user/profile",
    //   icon: <VscAccount />,
    // },
    {
      title: "Đơn mua",
      link: "/user/purchase",
      icon: <GiNotebook />,
    },
    // {
    //   title:'Thông báo',
    //   link:'/user/infor',
    //   icon:<HiAnnotation/>
    // }
  ];
  const path = useLocation().pathname;

  return (
    <div>
      {user.map((e, index) => (
        <Link to={e.link} key={index} className="block mb-2">
          <span className=" flex items-center gap-2 justify-center ">
            <span className="text-xl">{e.icon}</span>
            <span className={`${path===e.link?'text-':''}`}> {e.title}</span>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default User;
