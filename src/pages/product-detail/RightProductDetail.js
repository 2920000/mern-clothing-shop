import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertToPrice } from "../../helper/converToPrice";
import InputNumberBox from "./InputNumberBox";
import { userSelector } from "../../features/accountSlice";
import addProductToDatabase from "../../helper/addProductToDatabase";
import { allCartProductsSelector } from "../../features/cartSlice";
import { caculateSale } from "../../helper/caculateSale";
import addProductToLocal from "../../helper/addProductToLocal";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaShippingFast, FaCentercode } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
function RightProductDetail({ productDetail }) {
  const [productSize, setProductSize] = useState("S");
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const allCartProducts = useSelector(allCartProductsSelector);

  const handleChangeSize = (size) => {
    setProductSize(size);
  };

  const productInfor = productDetail.description?.split("|");
  const sizeItemProps = {
    productSize,
    handleChangeSize,
  };

  useEffect(() => {
    // getCartFromDatabase(user._id)
  });

  return (
    <div className="max-w-[400px]">
      <div id="right-detail-inner">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span>{productDetail.brand}</span>
            {productDetail.sale > 0 && (
              <span className="bg-red text-white py-1.5 px-5 font-bold">
                Sale
              </span>
            )}
          </div>
          <h3 className="font-extrabold mb-2 text-[1.8rem]">
            {productDetail.title}
          </h3>
          {productDetail.sale > 0 ? (
            <div className="flex items-center">
              <span className="mr-2 text-lg text-red">
                {convertToPrice(caculateSale(productDetail))}đ
              </span>
              <span className="text-sm line-through text-light_grey mr-1">
                {convertToPrice(productDetail.price)}đ
              </span>
              <span className="w-10 h-5 bg-black text-white text-xs flex justify-center items-center ml-2">
                -{productDetail.sale}%
              </span>
            </div>
          ) : (
            <span className="text-lg">
              {convertToPrice(productDetail.price)}đ
            </span>
          )}
          <div className="flex">
            {productDetail.size?.map((s, index) => (
              <SizeItem key={index} size={s} {...sizeItemProps} />
            ))}
          </div>
          <div className="flex  mt-5">
            <div className="">
              <InputNumberBox />
            </div>
            <div
              onClick={() => {
                user
                  ? addProductToDatabase(
                      productDetail,
                      user._id,
                      dispatch,
                      allCartProducts,
                      productSize
                    )
                  : addProductToLocal(productDetail, dispatch, productSize);
              }}
              className="flex-grow py-2.5 ml-3 bg-black hover:bg-white hover:text-black cursor-pointer border border-black transition-all duration-150  text-white flex justify-center items-center text-lg font-bold"
            >
              Thêm vào giỏ hàng
            </div>
          </div>
          <div className="mt-5 ">
            <p className="font-bold text-sm mb-4">Chi tiết sản phẩm</p>
            {productInfor?.map((e, index) => (
              <li key={index} className="text-sm mt-2">
                {e}
              </li>
            ))}
          </div>
          <div>
            <FreeShipping />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightProductDetail;

const SizeItem = ({ size, productSize, handleChangeSize }) => {
  return (
    <li
      onClick={() => {
        handleChangeSize(size);
      }}
      style={productSize === size ? { border: "3px solid black" } : {}}
      className={`w-[45px] h-[45px] transition-all duration-250 flex items-center justify-center text-sm  mr-2 mt-5 cursor-pointer  ${
        productSize === size
          ? "border-[3px] border-black"
          : "border border-border_size_color"
      } `}
    >
      {size}
    </li>
  );
};

const FreeShipping = () => {
  const shippingRules = [
    {
      title: "Miễn phí vận chuyển ",
      subTitle:
        "Giao hàng miễn phí với mức giá cố định cho các đơn hàng trên 499.000₫ Giao hàng dự kiến vào ngày 17/04/2022 - 22/04/2022.",
      icon: <FaShippingFast />,
    },
    {
      title: "Quy tắc COD",
      subTitle: "Tìm hiểu thêm",
      icon: <FaCentercode />,
    },
    {
      title: "Chính sách hoàn trản",
      subTitle: "Tìm hiểu thêm",
      icon: <IoShieldCheckmarkOutline />,
    },
  ];
  return (
    <ul className="w-full p-5 bg-[#f7f8fa] mt-7">
      {shippingRules.map((rule, index) => (
        <li style={index===1?{padding:'15px 0'}:{}} key={index} className="flex list-none ">
        <div className="text-2xl mr-2 text-[#198055] mt-1">{rule.icon}</div>
          <div>
            <p className="flex items-center text-[13px] font-semibold">
              {rule.title}
              <AiFillQuestionCircle className="text-light_black ml-1" />
            </p>
            <span className="block text-light_black leading-[1.4] text-[11px]">{rule.subTitle}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
