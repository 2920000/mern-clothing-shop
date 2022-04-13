import React from "react";
import { Outlet } from "react-router-dom";
function Account() {
  return (
    <div className="border-b ">
      <div className="max-w-[1200px] m-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Account;
