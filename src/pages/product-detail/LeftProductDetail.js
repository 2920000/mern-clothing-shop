import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import useEventListener from "../../hooks/useEventListener";
// import "./styles.css";

function LeftProductDetail({ productDetail }) {
  const [change, setChange] = useState(false);
  const allPictureRef = useRef();

  useEventListener("scroll", () => {
    if (window.innerWidth < 800) {
      setChange(true);
      return;
    }
    setChange(false);
  });

  useEffect(() => {
    let event = window.addEventListener("resize", (event) => {
      if (window.innerWidth < 800) {
        setChange(true);
        return;
      }
      setChange(false);
    });
    return () => {
      window.removeEventListener("resize", event);
    };
  }, [change]);

  if (change || window.innerWidth < 800) {
    return (
      <div
        ref={allPictureRef}
        id="detailLeft"
        className="flex relative flex-wrap w-full lg:w-[60%] mr-14  "
      >
        <Swiper
          pagination={{clickable:true}}
          spaceBetween={30}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <ImageDetail img={productDetail.image} />
          </SwiperSlide>
          {productDetail.sub_image?.map((img, index) => (
            <SwiperSlide>
              <ImageDetail key={index} img={img} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
  return (
    <div
      ref={allPictureRef}
      id="detailLeft"
      className="flex relative flex-wrap w-full lg:w-[60%] mr-10 "
    >
      <ImageDetail img={productDetail.image} />
      {productDetail.sub_image?.map((img, index) => (
        <ImageDetail key={index} img={img} />
      ))}
    </div>
  );
}

export default LeftProductDetail;

const ImageDetail = ({ img }) => {
  return (
    <div className="min-w-full lg:min-w-0 lg:max-w-[calc(50%-16px)] lg:mr-2.5 mb-5">
      <img className="w-full top-0 object-cover h-full" src={img} alt="" />
    </div>
  );
};

const fixedRightProductDetail = (allPictureRef, rightDetailInnnerElement) => {
  const distanceLeftTop = allPictureRef.current.getBoundingClientRect().top;
  const distanceLeftBottom =
    allPictureRef.current.getBoundingClientRect().bottom;
  const heightRight = rightDetailInnnerElement.getBoundingClientRect().height;
  if (distanceLeftBottom <= heightRight) {
    rightDetailInnnerElement.classList.remove("fixed", "top-[10px]");
    rightDetailInnnerElement.classList.add("absolute", "bottom-0");
  } else if (distanceLeftTop < 0 && distanceLeftBottom >= heightRight) {
    rightDetailInnnerElement.classList.add("fixed", "top-[10px]");
    rightDetailInnnerElement.classList.remove("absolute", "bottom-0");
  } else if (distanceLeftTop > 0) {
    rightDetailInnnerElement.classList.remove("fixed", "top-[10px]");
  }
};
