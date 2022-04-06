import { useEffect } from "react";
import { VscClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import convertToVietnamese from "../../../helper/convertToVietnamese";
import { deletePreParam } from "../filter/FilterOption";

const RefineItem = ({ keySelected, value, collection }) => {
  const navigate = useNavigate();
  const allCheckBoxes = document.querySelectorAll("input[type=checkbox]");

  useEffect(() => {
    allCheckBoxes.forEach((checkbox) => {
      if (checkbox.value === value) {
        checkbox.checked = true;
      }
    });
  });

  const handleDeleteChoice = (key, value) => {
    let searchUrl= new URLSearchParams(window.location.search)
    deletePreParam(searchUrl,
      key,
      value,
      navigate,
      collection)
    
  };

  return (
    <li className=" flex justify-between list-none items-center mb-2">
      <div className="">
        <span className="text-sm">{convertToVietnamese(keySelected)}</span>:
        <span className="ml-2 font-semibold text-sm">{convertToVietnamese(value)}</span>
      </div>
      <span
        onClick={() => {
          handleDeleteChoice(keySelected, value);
        }}
        className="text-xl text-light_grey cursor-pointer"
      >
        <VscClose />
      </span>
    </li>
  );
};

export default RefineItem   ;
