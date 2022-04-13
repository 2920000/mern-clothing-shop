import React from "react";
import ReactDom from "react-dom";
function RoomableImage() {
  return ReactDom.createPortal(
    <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-[rgba(0,0,0,0.4)] z-40 ]">

    </div>,
    document.getElementById("roomable-image")
  );
}

export default RoomableImage;
