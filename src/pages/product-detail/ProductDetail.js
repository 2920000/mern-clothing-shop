import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LeftProductDetail from "./LeftProductDetail";
import RightProductDetail from "./RightProductDetail";
import Review from "./Review";
import instance from "../../api/axiosClient";
function ProductDetail() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState({});
  useEffect(() => {
    window.scrollTo(0,0)
    const fetchAllProduct = async () => {
      const response = await instance.get(`/products/detail/${productId}`);
      setProductDetail(response.data);
    };
    fetchAllProduct();
  }, [productId]);
  return (
    <div className="max-w-[1350px] px-10 m-auto pt-[20px] ">
      <p className="text-xs mb-5 ">
        <Link to='/'>Trang chủ</Link>
        <span className="mx-2">
          <span className="mr-2">/</span>Tất cả <span className="ml-2">/</span>
        </span>
        {productDetail.title}
      </p>
      <div className="flex relative  ">
        <LeftProductDetail productDetail={productDetail} />
        <RightProductDetail productDetail={productDetail} />
      </div>
       <div>
         <Review/>
       </div>
    </div>
  );
}

export default ProductDetail;
