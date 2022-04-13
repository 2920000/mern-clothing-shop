import { useCallback, useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { SET_SHIPPING_FEE } from "../../features/checkoutSlice";
import { qs } from "../../helper/handleDOM";
import useClickOutside from "../../hooks/useClickOutside";

const ShippingMethod = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [method, setMethod] = useState({
      name: "Nhanh",
      value: "speed",
      price: 10000,
    });
    const methodListWrapperRef = useRef();
    
    useEffect(() => {
      dispatch(SET_SHIPPING_FEE(method.price));
    }, [method.price]);
  
    const handler = useCallback(() => {
      const iconElement = qs("#icon");
      iconElement.style.transform = "rotate(0deg)";
      setOpen(false);
    }, []);
  
    useClickOutside(methodListWrapperRef, handler);
  
    const handleOpenSelectShippingMethod = () => {
      const iconElement = qs("#icon");
      if (open) {
        iconElement.style.transform = "rotate(0deg)";
      } else {
        iconElement.style.transform = "rotate(180deg)";
      }
      setOpen(!open);

    };
    return (
      <div className="flex  gap-x-5  bg-white border-t border-border py-5 px-2 md:px-8">
        <div>
          <p className="text-sm text-blue-600">Đơn vị vận chuyển</p>
          <div className="mt-2" ref={methodListWrapperRef}>
            <div className="relative" onClick={handleOpenSelectShippingMethod}>
              <div className="flex items-center justify-between p-2 cursor-pointer min-w-[180px] min-h-[40px] border border-light_black ">
                {method.name}-{method.price}{" "}
                <BiChevronDown
                  id="icon"
                  className="text-xl transition-transform duration-150 "
                />
              </div>
              {open && <ShippingMethodList setMethod={setMethod} />}
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default ShippingMethod
  
const ShippingMethodList = ({ setMethod }) => {
    const shippingMethod = [
      {
        name: "Nhanh",
        value: "speed",
        price: 10000,
      },
      {
        name: "Hỏa tốc",
        value: "speeder",
        price: 20000,
      },
    ];
    const handleSelectShippingMethod = (method) => {
      setMethod(method);
    };
  
    return (
      <div className="absolute top-[calc(100%+1px)] bg-white w-full shadow-lg ">
        {shippingMethod.map((method, index) => (
          <div
            onClick={() => handleSelectShippingMethod(method)}
            key={index}
            className="py-2.5 pl-2 cursor-pointer"
          >
            {method.name}-{method.price}
          </div>
        ))}
      </div>
    );
  };