import { Swiper, SwiperSlide } from "swiper/react";
import {Pagination,Navigation} from 'swiper'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
function SuggestedProducts() {
  return (
    <div className="">
    <p className="text-center font-semibold text-3xl my-10">Đề xuất cho bạn</p>
      <Swiper
       slidesPerView={4}
       spaceBetween={5}
       slidesPerGroup={1}
       loop={true}
       navigation={true}
       modules={[Pagination,Navigation]}
       className='mySwiper'
      >
        {Array(10)
          .fill()
          .map((e, index) => (
            <SwiperSlide key={index}>
                <div className="min-w-[330px] min-h-[420px] bg-red"></div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default SuggestedProducts;
