import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from "react";
import { useGetProductsByTagsQuery } from "../../services/productsListApi";
function ProductList({ productId }) {
  const { data, refetch, isLoading } = useGetProductsByTagsQuery(productId);
  useEffect(() => {
    refetch();
  }, [productId]);
  if (!data || isLoading) {
    return <></>;
  }
  return (
    <div className="">
      <p className="text-center font-semibold text-3xl my-5 lg:my-10">
        Đề xuất cho bạn
      </p>
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
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {data.map((product, index) => (
          <SwiperSlide key={index}>
            <img src={product.image} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductList;
