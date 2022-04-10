import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsBySearch,
  FINDING_PRODUCT,
  GET_CURRENT_SEARCH_PRODUCTS,
  preProductsBySearchSelector,
} from "../../../features/searchSlice";
import {
  removeVietnameseTones,
  removeWhiteSpaceAndLowerCase,
} from "../../../helper";

const SearchInput = ({ setOpenSuggestionBox, input, setInput }) => {
  const dispatch = useDispatch();
  const [preInput, setPreInput] = useState([]);
  const preProductsBySearch = useSelector(preProductsBySearchSelector);

  const handleOnchangeInput = (value) => {
    setInput(value);
    setOpenSuggestionBox(true);
  };

  const handleShowSearchBox = (e) => {
    setOpenSuggestionBox(true);
  };

  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      if (!input) {
        return;
      }
      const newInput = removeWhiteSpaceAndLowerCase(input);
      const checkInputSamePre = preInput.every((e) => e !== newInput);
      if (checkInputSamePre) {
        dispatch(fetchProductsBySearch(newInput));
        setPreInput([...preInput, newInput]);
      } else {
        const searchData = preProductsBySearch.filter((e) =>
          removeVietnameseTones(removeWhiteSpaceAndLowerCase(e.title)).includes(
            removeVietnameseTones(removeWhiteSpaceAndLowerCase(input))
          )
        );
        setPreInput(preInput);
        dispatch(GET_CURRENT_SEARCH_PRODUCTS(searchData));
      }
    }, 400);
    return () => {
      clearTimeout(timeout);
      dispatch(FINDING_PRODUCT(true));
    };
  }, [input]);
  return (
    <input
      onChange={(e) => {
        handleOnchangeInput(e.target.value);
      }}
      id="search-input"
      placeholder="Tìm kiếm"
      autoFocus
      autoComplete="off"
      onClick={handleShowSearchBox}
      className="py-1.5 pl-5 w-full border-0 outline-none placeholder:text-black"
    />
  );
};

export default SearchInput;
