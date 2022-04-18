import React, { useState } from "react";
import { CgLoadbar } from "react-icons/cg";
import { HiPlusSm } from "react-icons/hi";
import { qs } from "../../../../../helper/handleDOM";

function FilterName({ title, name}) {
  const [filterToggle, setFilterToggle] = useState(true);
  const handleToggleOption = (id) => {
    const elementOption = qs(`#${id}`)
    if (filterToggle) {
      elementOption.style.maxHeight='0'
    } else {
      elementOption.style.maxHeight='200px'
    }
    setFilterToggle(!filterToggle)
  };
  return (
    <div className={`flex justify-between text-sm items-center py-4 ${name==='brand'?'pt-0':''} `}>
      <h3 className="font-bold  ">{title}</h3>
      <div
        onClick={() => {
          handleToggleOption(name);
        }}
        className="cursor-pointer text-light_grey "
      >
        {filterToggle ? <CgLoadbar /> : <HiPlusSm className="text-lg" />}
      </div>
    </div>
  );
}

export default FilterName;

