import React, { useEffect, useRef, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import ReactDOM from "react-dom";
import useClickOutside from "../hooks/useClickOutside.js";
const NeedsClick = ({ setDiscountForm, discountForm }) => {
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const getDiscountBoxRef = useRef();
  const [transition, setTransition] = useState(true);
  // useEffect(() => {
  //   window.addEventListener("resize", (event) => {
  //     if (window.innerWidth < 850) {
  //       document.querySelector("#helo").style.transform = `scale(0.5)`;
  //     }
  //   });
  // });
  useClickOutside(getDiscountBoxRef, () => {
    setTimeout(() => {
      setDiscountForm(false);
    }, 500);
    setTransition(true);
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  useEffect(() => {
    setTransition(false)
  },[]);

  const handleDetectActive = (e) => {
    if (e.target === document.activeElement) {
      e.target.style.outline = "2px dotted grey";
      getDiscountBoxRef.current.style.outline = "none";
    } else {
      getDiscountBoxRef.current.style.outline = "2px dotted grey";
      e.target.style.outline = "none";
    }
  };

  const handleClose = () => {
    setTimeout(() => {
      setDiscountForm(false);
    }, 500);
    setTransition(true);
  };
  
  return ReactDOM.createPortal(
    <div className="fixed font-montserrat z-50 flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)] transition-all duration-[1.5s] ">
      <div
        id="box"
        style={
          transition
            ? { opacity: "0", transform: "translateY(100px)" }
            : { opacity: "1", transform: "translateY(0)" }
        }
        ref={getDiscountBoxRef}
        className=" absolute opacity-0 translate-y-[100px] transition-all duration-700 flex w-full max-w-[780px] min-h-[400px] outline-dotted outline-[2px] outline-light_black bg-black"
      >
        <IoCloseCircleOutline
          onClick={handleClose}
          className="absolute right-2 text-white cursor-pointer top-2 text-[40px]"
        />
        <div className="w-1/2 min-h-full px-5 flex flex-col justify-center items-center ">
          <h3 className="text-white text-4xl mb-4 font-extrabold">
            Giảm giá 20%...?
          </h3>
          <p className="text-white text-center text-sm mb-4">
            Đăng ký đến cửa hàng để nhận 20% giảm giá cho lần mua đầu tiên.
          </p>
          <form>
            <input
              onFocus={handleDetectActive}
              onBlur={handleDetectActive}
              ref={emailInputRef}
              required
              id=""
              className="w-full pl-3 py-3 mb-3 rounded-sm"
              type="text"
              placeholder="Email:"
            />
            <div className="w-full flex items-end">
              <input
                onFocus={handleDetectActive}
                onBlur={handleDetectActive}
                ref={nameInputRef}
                required
                type="text"
                className="w-1/2 pl-3 py-3 mr-4 rounded-sm"
                placeholder="Tên:"
              />
              <input
                type="submit"
                value="Xem mã của bạn"
                className="flex items-center justify-center text-white bg-[#2671c9] w-1/2 min-h-[37px] cursor-pointer "
              />
            </div>
          </form>
        </div>
        <div className="w-1/2 object-center ">
          <div
            style={{
              backgroundImage: `url("https://d3k81ch9hvuctc.cloudfront.net/company/SVkfFG/images/94b21022-4210-4a56-ba2f-0167fef4a1de.jpeg")`,
            }}
            className="h-full w-full bg-cover bg-center min-h-[480px]"
          />
        </div>
      </div>
    </div>,
    document.getElementById("needsclick")
  );
};

export default NeedsClick;
