import React, { useEffect, useRef } from "react";
import handleDOM from "../../helper/handleDOM";

function LeftProductDetail({ productDetail }) {
  const allPictureRef = useRef();
  useEffect(() => {
    const rightDetailInnnerElement = document.querySelector(
      "#right-detail-inner"
    );

    window.addEventListener("scroll", (event) => {
      const distanceLeftTop = allPictureRef.current.getBoundingClientRect().top;
      const distanceLeftBottom =
        allPictureRef.current.getBoundingClientRect().bottom;
      const heightRight =
        rightDetailInnnerElement.getBoundingClientRect().height;
      if (distanceLeftBottom <= heightRight) {
        rightDetailInnnerElement.classList.remove("fixed", "top-[10px]");
        rightDetailInnnerElement.classList.add("absolute", "bottom-0");
      } else if (distanceLeftTop < 0 && distanceLeftBottom >= heightRight) {
        rightDetailInnnerElement.classList.add("fixed", "top-[10px]","max-w-[400px]");
        rightDetailInnnerElement.classList.remove("absolute", "bottom-0");
      } else if (distanceLeftTop > 0) {
        rightDetailInnnerElement.classList.remove("fixed", "top-[10px]");
      }
    });
  });
  return (
    <div ref={allPictureRef} className="grid grid-cols-2 gap-y-3 w-[60%] mr-14  ">
      <div className="relative  pt-[125%]">
        <img
          className="absolute top-0 object-cover h-full"
          src={productDetail.image}
          alt=""
        />
      </div>
      {productDetail.sub_image?.map((img, index) => (
        <div key={index} className="relative pt-[125%]">
          <img
            className="absolute top-0 object-cover h-full"
            src={img}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}

export default LeftProductDetail;
