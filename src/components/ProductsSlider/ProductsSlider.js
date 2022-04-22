import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProductCard from "../ProductCard";

function ProductsSlider({ products, slidesPerView = 4,spaceBetween=20,cardInforCss='' }) {
  return (
    <div className="">
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        slidesPerGroup={1}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          800: {
            slidesPerView,
            spaceBetween,
          },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard product={product} cardInforCss={cardInforCss} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductsSlider;
