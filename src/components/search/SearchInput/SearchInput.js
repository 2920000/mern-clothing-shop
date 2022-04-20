import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_SUGGSETION_BOX,
  OPEN_SUGGSETION_BOX,
  SET_STATUS_LOADING,
  UPDATE_CURRENT_SEARCH_PRODUCTS,
  UPDATE_VALUE_INPUT,
  fetchProductsBySearch,
  inputValueSelector,
  preProductsBySearchSelector,
} from "../../../features/headerSlice";
import {
  getLocalStorage,
  removeVietnameseTones,
  removeWhiteSpaceAndLowerCase,
} from "../../../helper";

const SearchInput = () => {
  const dispatch = useDispatch();
  const [preInput, setPreInput] = useState([]);
  const preProductsBySearch = useSelector(preProductsBySearchSelector);
  const inputValue = useSelector(inputValueSelector);

  const currentSearchFromLocal = getLocalStorage("currentSearch");

  const handleOnchangeInput = (value) => {
    dispatch(UPDATE_VALUE_INPUT(value));
  };

  const handleShowSearchBox = (e) => {
    dispatch(OPEN_SUGGSETION_BOX());
  };

  // login dùng để kiểm tra - nếu là một input mới sẽ fetch data mới
  // nếu input cũ thì sẽ lấy trong mảng data cũ đã lưu , ko cần phải fetch data mới
  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      if (!inputValue && !currentSearchFromLocal) {
        dispatch(SET_STATUS_LOADING(false));
        dispatch(CLOSE_SUGGSETION_BOX());
        return;
      }
      const inputCleaned = removeWhiteSpaceAndLowerCase(inputValue);
      const isNewInput = preInput.every((e) => e !== inputCleaned);

      if (isNewInput) {
        dispatch(fetchProductsBySearch(inputCleaned));
        setPreInput([...preInput, inputCleaned]);
      } else {
        const searchedData = preProductsBySearch.filter((e) =>
          removeVietnameseTones(removeWhiteSpaceAndLowerCase(e.title)).includes(
            removeVietnameseTones(removeWhiteSpaceAndLowerCase(inputValue))
          )
        );
        setPreInput(preInput);
        dispatch(UPDATE_CURRENT_SEARCH_PRODUCTS(searchedData));
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);

  return (
    <input
      onChange={(e) => {
        handleOnchangeInput(e.target.value);
      }}
      value={inputValue}
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
