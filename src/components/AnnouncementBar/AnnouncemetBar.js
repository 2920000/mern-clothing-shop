import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { Popup } from "../../modal";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";

function AnnouncemetBar() {

  const announcementList = [
    "  Miễn phí vận chuyển sản phẩm trên 1 triệu",
    "Nhận ngay 50% giảm giá sản phẩm",
    " Sản phẩm mới hàng tuần",
  ];

  return (
    <div className="bg-black py-2">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {announcementList.map((e, index) => (
          <SwiperSlide
            key={index}
            className="bg-black text-white text-[0.9rem] "
          >
            {e}
          </SwiperSlide>
        ))}
      </Swiper>
      <Popup/>
    </div>
  );
}

export default AnnouncemetBar;
