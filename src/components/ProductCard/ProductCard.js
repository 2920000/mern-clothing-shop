import React, { useEffect, useRef, memo } from "react";
import { Link } from "react-router-dom";
import { calculateSale, convertToPrice, qsa } from "../../helper";
import useHover from "../../hooks/useHover";

const ProductCart = ({ product, className='',cardInforCss='' }) => {
  const isSale = product.sale !== 0;
  const props = {
    product,
    isSale,
    cardInforCss
  };

  return (
    <div
      className={`${className}  transition-all duration-150 w-full h-full `}
    >
      <ProductImage {...props} />
      <ProductInfor {...props} />
    </div>
  );
};

export default memo(ProductCart);

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
    <div className="relative image-wrapper ">
      <div className=" top-0 z-[-10] w-full pt-[130%] bg-skeleton_color animate-skeleton"></div>
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
            src={product.subImage||product.sub_image[1]}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

const ProductInfor = ({ product, isSale,cardInforCss='' }) => {
  return (
    <div className={cardInforCss}>
      <span className="block font-semibold mt-2 px-1 text-left">{product.brand}</span>
      <div className="flex justify-between flex-col mder:flex-row text-[0.82rem] px-1 ">
        <span className="text-left">{product.title}</span>
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
    </div>
  );
};
