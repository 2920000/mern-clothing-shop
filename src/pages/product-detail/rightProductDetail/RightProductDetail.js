import React, { useRef, useState } from "react";
import useEventListener from "../../../hooks/useEventListener";
import ProductSize from "./ProductSize";
import ProductPrice from "./ProductPrice";
import ProductTitle from "./ProductTitle";
import ProductPurchase from "./ProductPurchase";
import ProductDescribe from "./ProductDescribe";
import ProductPolicy from "./ProductPolicy";
function RightProductDetail({ productDetail }) {
  const [productSize, setProductSize] = useState("S");
  const [styleDetailRight, setStyleDetailRight] = useState({});
  const emptyRightRef = useRef();
  const rightDetailInnerRef = useRef();
  const handleChangeSize = (size) => {
    setProductSize(size);
  };
  const productSizeProps = {
    productDetail,
    productSize,
    handleChangeSize,
  };
  useEventListener("resize", () => {
    if (window.innerWidth < 800) {
      setStyleDetailRight({});
      rightDetailInnerRef.current.style.width = `100%`;
      return;
    }
    const width = emptyRightRef.current.offsetWidth;
    rightDetailInnerRef.current.style.width = `${width}px`;
  });
  useEventListener("scroll", () => {
    if (window.innerWidth < 800) {
      return;
    }
    const { distanceLeftBottom, distanceLeftTop, heightRight } = getDistance();
    if (distanceLeftBottom <= heightRight) {
      setStyleDetailRight({
        position: "absolute",
        bottom: "0",
      });
    } else if (distanceLeftTop < 0 && distanceLeftBottom >= heightRight) {
      setStyleDetailRight({
        position: "fixed",
        top: "10px",
      });
    } else if (distanceLeftTop > 0) {
      setStyleDetailRight({});
    }
  });

  return (
    <div className=" relative w-full lg:w-[40%] lg:max-w-[400px]">
      <div
        ref={emptyRightRef}
        id="empty-right-detail-inner"
        className="w-full z-[-1] h-screen absolute max-w-[400px]"
      ></div>
      <div
        ref={rightDetailInnerRef}
        style={styleDetailRight}
        id="right-detail-inner"
        className="w-full relative lg:absolute  lg:max-w-[400px] "
      >
        <ProductTitle productDetail={productDetail} />
        <ProductPrice productDetail={productDetail} />
        <ProductSize {...productSizeProps} />
        <ProductPurchase
          productSize={productSize}
          productDetail={productDetail}
        />
        <ProductDescribe productDetail={productDetail} />
        <ProductPolicy />
      </div>
    </div>
  );
}

export default RightProductDetail;

const getDistance = () => {
  const rightDetailInnnerElement = document.querySelector(
    "#right-detail-inner"
  );
  const detailLeft = document.querySelector("#detailLeft");
  const distanceLeftTop = detailLeft.getBoundingClientRect().top;
  const distanceLeftBottom = detailLeft.getBoundingClientRect().bottom;
  const heightRight = rightDetailInnnerElement.getBoundingClientRect().height;
  return { distanceLeftTop, distanceLeftBottom, heightRight };
};
