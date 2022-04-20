import React, { useCallback, useRef, useState } from "react";
import useEventListener from "../../../hooks/useEventListener";
import ProductSize from "./ProductSize";
import ProductPrice from "./ProductPrice";
import ProductPurchase from "./ProductPurchase";
import ProductDescribe from "./ProductDescribe";
import ProductPolicy from "./ProductPolicy";
import useResizeObserver from "../../../hooks/useResizeObserver";
import ProductOverview from "./ProductOverview";
import { qs } from "../../../helper";
function ProductDetailInformation({ productDetail }) {
  const [styleDetailRight, setStyleDetailRight] = useState({});
  const emptyRightRef = useRef();
  const rightDetailInnerRef = useRef();

  const props = {
    productDetail,
  };

  const bodyRef = useRef(qs("body"));
  const callbackSaved = useCallback((entry) => {
    if (!emptyRightRef.current) {
      return;
    }
    if (window.innerWidth < 800) {
      setStyleDetailRight({});
      rightDetailInnerRef.current.style.width = `100%`;
      return;
    }
    const width = emptyRightRef.current.offsetWidth;
    rightDetailInnerRef.current.style.width = `${width}px`;
  }, []);
  useResizeObserver(bodyRef, callbackSaved);

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
        <ProductOverview {...props} />
        <ProductPrice {...props} />
        <ProductSize {...props} />
        <ProductPurchase {...props} />
        <ProductDescribe {...props} />
        <ProductPolicy />
      </div>
    </div>
  );
}

export default ProductDetailInformation;

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
