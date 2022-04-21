import React, { useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { calculateSale, convertToPrice, qsa } from "../../../../helper";
import useHover from "../../../../hooks/useHover";

const ProductItem = ({ product }) => {
  const isSale = product.sale !== 0;
  const props = {
    product,
    isSale,
  };

  return (
    <div className="relative mb-5  w-[calc(50%-8px)] lg:w-[calc(33.33%-8px)] transition-all duration-150  ">
      <ProductImage {...props} />
      <ProductInfor {...props} />
    </div>
  );
};

export default memo(ProductItem);

const IsSale = ({ isSale }) => {
  if (!isSale) {
    return <></>;
  }
  return (
    <div
      id="sale"
      className="absolute  z-20 bg-red text-white top-0 py-[8px] px-[14px] cursor-text font-bold "
    >
      Sale
    </div>
  );
};

const ProductImage = ({ product, isSale }) => {
  const subImageRef = useRef();
  const [hoverRef, hovered] = useHover();

  useEffect(() => {
    const loadImage = (element) => {
      const lazyWrapper = element.querySelector(".lazy-wrapper");
      const lazyImage = lazyWrapper.querySelector(".image");
      const url = lazyImage.getAttribute("lazy-src");
      // lazyIamge.style.backgroundImage = `url(${url})`;
      lazyImage.setAttribute("src", url);
      lazyWrapper.style.opacity = 1;
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage(entry.target);
          }
        });
      },
      {
        threshold: 0.4,
      }
    );
    const lazyImages = qsa(".image-wrapper");
    lazyImages.forEach((element) => {
      observer.observe(element);
    });
  }, []);

  useEffect(() => {
    if (hovered) {
      subImageRef.current.style.opacity = "1";
      return;
    }
    subImageRef.current.style.opacity = "0";
  });

  return (
    // <div className="relative pt-[125%]">
    //   <div className="absolute top-0 w-full h-full  bg-skeleton_color animate-skeleton"></div>
    //   <div className="image-wrapper opacity-0 w-full h-full absolute top-0 ">
    //     <IsSale isSale={isSale} />
    //     <Link
    //       ref={hoverRef}
    //       to={`/products/${(product.slug)}`}
    //       className="w-full absolute image h-full bg-cover  top-0 left-0  "
    //       lazy-src={product.image}
    //     >
    //       <img
    //         ref={subImageRef}
    //         className="absolute opacity-0 transition-all duration-300  w-full h-full "
    //         src={product.subImage}
    //         alt=""
    //       />
    //     </Link>
    //   </div>
    // </div>
    <div className="relative image-wrapper ">
      <div className=" top-0 first-letter:z-[-10] w-full pt-[130%] bg-skeleton_color animate-skeleton"></div>
      <div className="lazy-wrapper absolute top-0  h-full w-full opacity-0">
        <IsSale isSale={isSale} />
        <Link ref={hoverRef} to={`/products/${product.slug}`}>
          <img
            className="w-full image h-full bg-cover "
            lazy-src={product.image}
            alt=""
          />
          <img
            ref={subImageRef}
            className=" absolute top-0 opacity-0 object-cover transition-all duration-300  w-full h-full "
            src={product.subImage}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

const ProductInfor = ({ product, isSale }) => {
  return (
    <>
      <span className="block font-bold text-sm mt-2 px-1">{product.brand}</span>
      <div className="flex justify-between  flex-col mder:flex-row text-[0.82rem] px-1 ">
        <span>{product.title}</span>
        <span>
          {isSale && (
            <span className="whitespace-nowrap">
              {convertToPrice(calculateSale(product))} đ
            </span>
          )}
          <div
            className={`${
              isSale && " line-through right-[0.25rem] bottom-[-15px] "
            }`}
          >
            <span
              className={`whitespace-nowrap ${isSale && "text-light_grey"} `}
            >
              {convertToPrice(product.price)} đ
            </span>
          </div>
        </span>
      </div>
    </>
  );
};

{
  /* <p
        ref={addToCartRef}
        className="absolute opacity-0 transition-all duration-150 cursor-pointer top-[80%] left-1/2 translate-y-[-50%] translate-x-[-50%] font-bold bg-white text-black  w-[60%] h-[45px] px-5 flex justify-center items-center hover:bg-black hover:text-white "
      >
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          Chi tiết
        </span>
      </p> */
}
