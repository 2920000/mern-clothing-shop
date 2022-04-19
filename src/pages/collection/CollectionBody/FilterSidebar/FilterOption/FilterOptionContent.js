import { useNavigate, useParams } from "react-router-dom";
import { convertPriceFilter, convertToVietnamese } from "../../../../../helper";

function FilterOptionContent({ name, selection }) {
  return (
    <div
      id={name}
      className="max-h-[200px] overflow-hidden  opacity-100 transition-all duration-300  "
    >
      {selection?.map((e, index) => (
        <SelectionItem key={index} e={e} name={name} index={index} />
      ))}
    </div>
  );
}

export default FilterOptionContent;

const SelectionItem = ({ index, name, e }) => {
  const { collection } = useParams();
  const navigate = useNavigate();

  URLSearchParams.prototype.remove = function (key, value) {
    const valuesAfterFiltered = this.getAll(key).filter(
      (element) => element !== value
    );
    this.delete(key);
    for (const value of valuesAfterFiltered) {
      this.append(key, value);
    }
  };
  let searchParams = new URLSearchParams(window.location.search);

  const handleQuery = (selectedKey, id) => {
    const selectedValue = toggleCheckbox(id);
    const preValuesOfSelectedKey = searchParams.getAll(selectedKey);
    const isValueExisting = preValuesOfSelectedKey.some(
      (value) => value === selectedValue
    );
    if (searchParams.has(selectedKey) && isValueExisting) {
      searchParams.remove(selectedKey, selectedValue);
    } else {
      searchParams.append(selectedKey, selectedValue);
    }
    navigate({
      pathname: `/collection/${collection}`,
      search: searchParams.toString(),
    });
  };

  return (
    <button
      onClick={() => {
        handleQuery(name, `${name}-${index}`);
      }}
      key={index}
      className="flex items-center justify-between container cursor-pointer mb-2 text-[0.93rem]  "
    >
      <div className="whitespace-nowrap text-sm">
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
