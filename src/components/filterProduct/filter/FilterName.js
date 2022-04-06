import React from "react";
import { CgLoadbar } from "react-icons/cg";
import { HiPlusSm } from "react-icons/hi";
import { addClass, qs, removeClass } from "../../../helper/handleDOM";

function FilterName({ title, name, filterToggle, setFilterToggle }) {
  const handleToggleOption = (id) => {
    const elementOption = qs(`#${id}`)
    if (filterToggle) {
     hideFilter(elementOption)
    } else {
     showFilter(elementOption)
    }
    setFilterToggle(!filterToggle);
  };
  return (
    <div className="flex justify-between items-center ">
      <h3 className="font-bold ">{title}</h3>
      <div
        onClick={() => {
          handleToggleOption(name);
        }}
        className="text-sm cursor-pointer text-light_grey "
      >
        {filterToggle ? <CgLoadbar /> : <HiPlusSm className="text-lg" />}
      </div>
    </div>
  );
}

export default FilterName;

const hideFilter=(elementOption)=>{
  addClass(elementOption, ["opacity-0", "translate-y-[-300px]", "max-h-0"]);
  removeClass(elementOption, ["max-h-[200px]"]);
}
const showFilter=(elementOption)=>{
  removeClass(elementOption, [
    "opacity-0",
    "translate-y-[-300px]",
    "max-h-0",
  ]);
  addClass(elementOption, ["max-h-[200px]"]);
}