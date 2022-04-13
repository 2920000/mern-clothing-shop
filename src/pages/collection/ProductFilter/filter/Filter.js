import { useEffect } from "react";
import FilterName from "./FilterName";
import FilterOption from "./FilterOption";

const Filter = ({ title, selection, name }) => {

  const filterNameProps = {
    title,
    name,
  };

  const filterOptionProps = {
    name,
    selection,
  };


  useEffect(() => {
   checkedWhenReload()
  });

  return (
    <div
      className={`${
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