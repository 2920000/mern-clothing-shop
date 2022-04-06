import { useEffect, useState } from "react";
import FilterName from "./FilterName";
import FilterOption from "./FilterOption";

const Filter = ({ title, selection, name }) => {
  const [filterToggle, setFilterToggle] = useState(true);

  const filterNameProps = {
    title,
    name,
    setFilterToggle,
    filterToggle,
  };

  const filterOptionProps = {
    name,
    filterToggle,
    selection,
  };


  useEffect(() => {
   checkedWhenReload()
  });

  return (
    <div
      className={`py-4 ${
        name !== "pricess" && "border-b border-border_bottom_filter"
      }`}
    >
      <FilterName {...filterNameProps} />
      <FilterOption {...filterOptionProps} />
    </div>
  );
};
export default Filter;

const checkedWhenReload=()=>{
  const searchUrl = new URLSearchParams(window.location.search);
  const allCheckBoxes = document.querySelectorAll("input[type=checkbox]");
  const valuesOfParams = Array.from(searchUrl.values());
  allCheckBoxes.forEach((checkbox) => {
    const isSelected = valuesOfParams.some(
      (value) => value === checkbox.value
    );
    isSelected ? (checkbox.checked = true) : (checkbox.checked = false);
  });
}