import React, { useEffect, useState} from "react";
import image from "../../logo.png";
import HeaderIconLeft from "./HeaderIconLeft";
import HeaderIconRight from "./HeaderIconRight";
import { addLocalStorage, getLocalStorage } from "../../helper/localStoragefunction";
import Search from "../search/Search";
import NeedsClick from "../../modal/NeedsClick";
function Header() {
  const [search, setSearch] = useState(true);
  const [backgroundHeader, setBackgroundHeader] = useState(false);
  const [discountForm,setDiscountForm]=useState(false)
 
  const param=window.location.pathname
  
  const props = {
    setSearch,
    setBackgroundHeader,
  };
  
  const needsclickProps={
    discountForm,
    setDiscountForm
  }


  useEffect(()=>{
    const allowPopUp=getLocalStorage('discountForm')
    if(!allowPopUp){
      setTimeout(()=>{
        setDiscountForm(true)
      },3000)
      addLocalStorage('discountForm',true)
    }
  },[])
  return (
    <div
      className={` relative  ${
        backgroundHeader
          ? "bg-black border-t border-bt_header border-b-[1.5px] border-b-white "
          : ""
      } transition-all duration-150 shadow-md `}
    >
      <div
        className={`flex box-border max-w-[1272px]  mx-auto px-8 lg:px-2 h-[70px] lg:h-[90px] border-b border-black lg:border-0 items-center`}
      >
        {search ? (
          <>
            {param!=='/checkout'&&<HeaderIconLeft {...props} />}
            <HeaderIconCenter param={param} />
            {param!=='/checkout'&&<HeaderIconRight {...props} />}
          </>
        ) : (
          <Search {...props} />
        )}
      </div>
      {discountForm&&<NeedsClick {...needsclickProps}/>}
    </div>
  );
}

export default Header;



const HeaderIconCenter = ({param}) => {
  return (
    <div style={param==='/checkout'?{display:'block'}:{}} className="flex grow justify-center  max-w-[33.33%]">
      <a href="/" className="flex items-center">
        <img
          src={image}
          alt=""
          className="w-[45px] lg:w-[50px]  cursor-pointer "
        />
        {param==='/checkout'&&<p className="ml-4 flex items-center border-l border-black pl-4 min-h-[30px] text-lg" >Thanh Toán</p>}
      </a>
    </div>
  );
};
