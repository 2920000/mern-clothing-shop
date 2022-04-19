import React, { useEffect,useRef} from "react";
import { Link } from "react-router-dom";
import banner from "../assets/image/banner.png";
function Home() {
  return (
    <div>
      <MainBlockFirst />
      <MainBlockSecond />
    </div>
  );
}

export default Home;

const MainBlockFirst = () => {
  const mainBlockFirstRef = useRef();
  useEffect(() => {
    const mainBlockFirstElement = mainBlockFirstRef.current;
    mainBlockFirstElement.style.opacity = "1";
    mainBlockFirstElement.style.transform = "translateY(0)";
  }, []);
  return (
    <div
      ref={mainBlockFirstRef}
      className="opacity-0 transition-all duration-700 translate-y-[-60px]"
    >
      <div>
        <Link to="/collection/mens-sale">
          <img
            className="w-[100%] max-h-[280px] object-cover mt-5 mb-10 bg-black  "
            src={banner}
            alt=""
          />
        </Link>
      </div>
      <div className="mt-12 relative">
        <img
          className="block w-full lg:hidden "
          src="https://cdn.shopify.com/s/files/1/2153/3679/files/B7F7EE5D-BD75-435E-9EE7-A397B68D82DA_600x.jpg?v=1646699073"
          alt=""
        />
        <div className="relative lg:pt-[32%]">
          <div
            style={{
              backgroundImage: `url("https://cdn.shopify.com/s/files/1/2153/3679/files/AAE_MAIN_BANNER_1800_2500x.jpg?v=1646698029")`,
            }}
            className="hidden w-full absolute top-0 bg-cover  h-full lg:block"
            // src="https://cdn.shopify.com/s/files/1/2153/3679/files/AAE_MAIN_BANNER_1800_2500x.jpg?v=1646698029"
            // alt=""
          />
        </div>
        <Link
          to={`/collection/mens-clothing`}
          className="absolute flex justify-center items-center top-1/2 left-[50%] translate-x-[-102%]  lg:translate-x-[-110%] bg-black text-white  transition duration-[220ms] ease-in-out hover:text-black hover:bg-white  min-w-[44vw] lg:min-w-[140px] min-h-[48px] text-lg"
        >
          Nam
        </Link>
        <Link
          to={`/collection/womens-clothing`}
          className="absolute flex justify-center items-center top-1/2 right-[50%]  translate-x-[102%] lg:translate-x-[110%] bg-black text-white  transition duration-[220ms] ease-in-out hover:text-black hover:bg-white min-w-[44vw] lg:min-w-[140px] min-h-[48px] text-lg"
        >
          Nữ
        </Link>
      </div>
    </div>
  );
};

const MainBlockSecond = () => {
  const blockSecondRef = useRef();
  useEffect(() => {
    const element = blockSecondRef.current;
    window.addEventListener("scroll", (event) => {
      const distanceBlockSecond = element.getBoundingClientRect().top;
      if (distanceBlockSecond <= window.innerHeight) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
        element.style.marginTop = "40px";
      } else {
        element.style.opacity = "0";
        element.style.transform = "translateY(-60px)";
        element.style.marginTop = "0px";
      }
    });
  });
  const collection = [
    {
      image:
        "https://cdn.shopify.com/s/files/1/2153/3679/files/EDGE_CAT_BANNER_400_x_5332.jpg?v=1646698447",
      title: "Womens Tops",
    },
    {
      image:
        "https://cdn.shopify.com/s/files/1/2153/3679/files/EDGE_CAT_BANNER_400_x_533.jpg?v=1646698489",
      title: "Men's T-Shirts",
    },
    {
      image:
        "https://cdn.shopify.com/s/files/1/2153/3679/files/70B213B5-E154-49B9-B653-08ECE45FB659.jpg?v=1646715457",
      title: "Women's T-shirts",
    },
    {
      image:
        "https://cdn.shopify.com/s/files/1/2153/3679/files/EDGE_CAT_BANNER_400_x_5333.jpg?v=1646698589",
      title: "Men's Pants",
    },
  ];
  return (
    <div
      ref={blockSecondRef}
      className="mt-[0px] opacity-0 translate-y-[-60px]  bg-white transition-all duration-700  "
    >
      <div className="text-center font-bold text-xl ">
        <div className=" inline py-2 px-5 border border-black">BỘ SƯU TẬP</div>
      </div>
      <div className=" grid grid-cols-2 lg:flex w-full mt-10 cursor-pointer ">
        {collection.map((e, index) => (
          <div key={index} className="relative">
            <img className="min-w-[100%]" src={e.image} alt="" />
            <div className="absolute px-6 w-full bottom-10 lg:flex lg:flex-col lg:items-start">
              <span className="block whitespace-nowrap mb-5 text-center lg:text-[24px] text-white  tracking-wider ">
                {e.title}
              </span>
              <div className="w-full font-semibold lg:font-bold text-[14px] py-0.5 text-center lg:max-w-[130px] lg:min-h-[40px] lg:flex lg:items-center lg:justify-center bg-black text-white cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ">
                MUA SẮM{" "}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
