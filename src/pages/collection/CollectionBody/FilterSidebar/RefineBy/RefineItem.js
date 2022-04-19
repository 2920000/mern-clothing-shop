import { useEffect } from "react";
import { VscClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { convertToVietnamese } from "../../../../../helper";

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
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.remove(key, value);
    navigate({
      pathname: `/collection/${collection}`,
      search: searchParams.toString(),
    });
  };

  return (
    <li className=" flex justify-between list-none items-center mb-2">
      <div className="">
        <span className="text-sm">{convertToVietnamese(keySelected)}</span>:
        <span className="ml-2 font-semibold text-sm">
          {convertToVietnamese(value)}
        </span>
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

export default RefineItem;
