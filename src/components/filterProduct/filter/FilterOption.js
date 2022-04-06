import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import convertPriceFilter from "../../../helper/convertPriceFilter";
import convertToVietnamese from "../../../helper/convertToVietnamese";

function FilterOption({ name, filterToggle, selection }) {
  return (
    <div className={`overflow-auto ${filterToggle && "mt-4"}`}>
      <div
        id={name}
        className="max-h-[200px]  opacity-100 transition-all duration-300  "
      >
        {selection?.map((e, index) => (
          <SelectionItem key={index} e={e} name={name} index={index} />
        ))}
      </div>
    </div>
  );
}

export default FilterOption;

const SelectionItem = ({ index, name, e }) => {
  const { collection } = useParams();
  const navigate = useNavigate();

  let searchUrl = new URLSearchParams(window.location.search);

  const handleQuery = (selectedKey, id) => {
    const selectedValue = toggleCheckbox(id);
    const prePriceValue = searchUrl.get("pricess");
    const checkValueExisting = Array.from(searchUrl.values()).every(
      (value) => value !== selectedValue
    );

    if (
      searchUrl.has("pricess") &&
      selectedKey === "pricess" &&
      prePriceValue !== selectedValue
    ) {
      setPrice(searchUrl, selectedValue, navigate, collection);
      return;
    }

    if (checkValueExisting) {
      appendParam(searchUrl, selectedKey, selectedValue, navigate, collection);
      return;
    }
    deletePreParam(
      searchUrl,
      selectedKey,
      selectedValue.replace(",", "%2C"),
      navigate,
      collection
    );
  };

  return (
    <button
      onClick={() => {
        handleQuery(name, `${name}-${index}`);
      }}
      key={index}
      className="flex items-center justify-between container cursor-pointer mb-2 text-[0.93rem]  "
    >
      <div className="whitespace-nowrap">
        <input
          type="checkbox"
          id={`${name}-${index}`}
          name={name}
          value={e.brand || e.color || convertPriceFilter(e) || e}
          className="hidden"
        />
        {name !== "pricess" && (
          <span className=" relative checkmark w-[15px] h-[15px] border first-letter: border-border_checkbox inline-block mr-2  cursor-pointer"></span>
        )}
        {e.brand || convertToVietnamese(e.color) || (
          <span className={name === "pricess" && ""}>{e}</span>
        )}
      </div>
    </button>
  );
};

const toggleCheckbox = (id) => {
  const inputElement = document.querySelector(`#${id}`);
  const x = inputElement.checked;
  inputElement.checked = !x;
  const selectedValue = inputElement.value;
  return selectedValue;
};

const appendParam = (searchUrl, key, value, navigate, collection) => {
  searchUrl.append(key, value);
  navigate({
    pathname: `/collection/${collection}`,
    search: searchUrl.toString(),
  });
};

export const deletePreParam = (
  searchUrl,
  selectedKey,
  selectedValue,
  navigate,
  collection
) => {
  let updateSearchUrl;
  let updateSearchUrl1 = searchUrl
    .toString()
    .replace(`${selectedKey}=${selectedValue.replace(" ", "+")}&`, "");
  let updateSearchUrl2 = updateSearchUrl1.replace(
    `&${selectedKey}=${selectedValue.replace(" ", "+")}`,
    ""
  );
  updateSearchUrl = updateSearchUrl2.replace(
    `${selectedKey}=${selectedValue.replace(" ", "+")}`,
    ""
  );
  navigate({
    pathname: `/collection/${collection}`,
    search: updateSearchUrl,
  });
};

const setPrice = (searchUrl, selectedValue, navigate, collection) => {
  searchUrl.set("pricess", selectedValue);
  navigate({
    pathname: `/collection/${collection}`,
    search: searchUrl.toString(),
  });
};
