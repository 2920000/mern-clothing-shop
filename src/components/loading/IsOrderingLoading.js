import React, { useEffect } from "react";

function IsOrderingLoading() {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "auto");
  });
  return (
    <div className="fixed flex justify-center items-center top-0 right-0 left-0 bottom-0 bg-[rgba(0,0,0,0.4)] z-40">
   <div class="lds-hourglass"></div>
    </div>
  );
}

export default IsOrderingLoading;
