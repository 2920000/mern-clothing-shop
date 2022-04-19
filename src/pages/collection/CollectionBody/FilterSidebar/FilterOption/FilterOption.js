import { useEffect } from "react";
import FilterOptionTitle from "./FilterOptionTitle";
import FilterOptionContent from "./FilterOptionContent";

const FilterOption = ({ title, selection, name }) => {
  const filterNameProps = {
    title,
    name,
  };

  const filterOptionProps = {
    name,
    selection,
  };

  useEffect(() => {
    checkedWhenReload();
  });

  return (
    <div
      className={`${
        name !== "pricess" && "border-b border-border_bottom_filter"
      }`}
    >
      <FilterOptionTitle {...filterNameProps} />
      <FilterOptionContent {...filterOptionProps} />
    </div>
  );
};
export default FilterOption;

const checkedWhenReload = () => {
  const searchUrl = new URLSearchParams(window.location.search);
  const allCheckBoxes = document.querySelectorAll("input[type=checkbox]");
  const valuesOfParams = Array.from(searchUrl.values());
  allCheckBoxes.forEach((checkbox) => {
    const isSelected = valuesOfParams.some((value) => value === checkbox.value);
    isSelected ? (checkbox.checked = true) : (checkbox.checked = false);
  });
};
