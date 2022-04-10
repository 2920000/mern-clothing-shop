import React, { useEffect, useRef ,memo} from "react";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { caculateSale } from "../../../helper/caculateSale";
import { convertToPrice } from "../../../helper/converToPrice";


const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const quickviewRef = useRef();
  const addToCartRef = useRef();
  const isSale = product.sale !== 0;
  const productProps = {
    product,
    quickviewRef,
    addToCartRef,
    dispatch,
    isSale,
  };
  const productInforProps = {
    product,
    isSale,
  };
  
  useEffect(() => {
    const load = (div) => {
      const url = div.getAttribute("lazy-src");
      div.style.backgroundImage = `url(${url})`;
    };
    // xem lại
    const ready = () => {
      var lazyImages = document.querySelectorAll("[lazy-src]");
      let observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              load(entry.target);
              const saleelement =
                entry.target.parentElement.querySelector("#sale");
              const previewPictureElement= entry.target.parentElement.getElementsByTagName(
                  "img"
                )[0]
              if (saleelement) {
                entry.target.parentElement.querySelector(
                  "#sale"
                ).style.display = "block";
              }
              if(previewPictureElement){
                previewPictureElement.style.display="block"
              }
             
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.3,
        }
      );
      lazyImages.forEach((img) => {
        observer.observe(img);
      });
    };
    ready();
  }, []);

  const handleOnMouseQuickView = (e) => {
    if (e.type === "mouseover") {
      quickviewRef.current.style.opacity = "1";
      addToCartRef.current.style.opacity = "1";
    } else {
      quickviewRef.current.style.opacity = "0";
      addToCartRef.current.style.opacity = "0";
    }
  };
 
  return (
    <div
      onMouseOver={(e) => handleOnMouseQuickView(e)}
      onMouseOut={(e) => handleOnMouseQuickView(e)}
      className=" preview relative mb-8 mx-[5px] w-[calc(50%-20px)]   lg:w-[calc(33.33%-20px)] transition-all duration-150  "
    >
      <ProductImage {...productProps} />
      <ProductInfor {...productInforProps} />
    </div>
  );
};

export default memo(ProductItem);

const IsSale = ({ isSale }) => {
  return (
    <>
      {isSale && (
        <div
          id="sale"
          className="absolute hidden z-20 bg-red text-white top-0 py-[6px] px-[14px] cursor-text font-bold "
        >
          Sale
        </div>
      )}
    </>
  );
};

const ProductImage = ({
  product,
  quickviewRef,
  addToCartRef,
  isSale,
}) => {
  
  return (
    <div className="relative pt-[125%]">
      <div className="absolute top-0 w-full h-full  bg-skeleton_color animate-skeleton"></div>
      <div>
        <IsSale isSale={isSale} />
        <Link
          to={`/products/${product._id}`}
          className="w-full absolute  image h-full bg-cover  top-0 left-0  "
          lazy-src={product.image}
        >
          <div
            ref={quickviewRef}
            className="opacity-0 transition-all duration-300"
          >
            <img
              className="absolute hidden w-full h-full "
              src={product.subImage}
              alt=""
            />
          </div>
        </Link>
      </div>
      <p
        ref={addToCartRef}
        className="absolute opacity-0 transition-all duration-150 cursor-pointer top-[80%] left-1/2 translate-y-[-50%] translate-x-[-50%] font-bold bg-white text-black  w-[60%] h-[45px] px-5 flex justify-center items-center hover:bg-black hover:text-white "
      >
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
        Chi tiết
        </span>
      </p>
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
            {convertToPrice(caculateSale(product))} đ
          </span>
        )}
        <div
          className={`${
            isSale && " line-through right-[0.25rem] bottom-[-15px] "
          }`}
        >
          <span className={`whitespace-nowrap ${isSale && "text-light_grey"} `}>
            {convertToPrice(product.price)} đ
          </span>
        </div>
       </span>
      </div>
    </>
  );
};
