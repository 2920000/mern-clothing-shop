import React, { useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { CLOSE_SEARCH_HEADER, CLOSE_SUGGSETION_BOX } from "../../features/headerSlice";
import useClickOutside from "../../hooks/useClickOutside";
import SearchInput from "./SearchInput";
import SuggestionBox from "./SuggestionBox/SuggestionBox";

function Search() {
  const dispatch = useDispatch();
  const boxRef = useRef();

  useClickOutside(boxRef, () => {
    dispatch(CLOSE_SUGGSETION_BOX());
  });

  useEffect(() => {
    return () => dispatch(CLOSE_SUGGSETION_BOX());
  }, []);

  return (
    <div className="flex items-center justify-center w-full">
      <IoIosClose
        onClick={() => dispatch(CLOSE_SEARCH_HEADER())}
        className="text-white text-3xl mr-2  cursor-pointer"
      />
      <div ref={boxRef} className=" w-full max-w-[580px] flex relative h-full">
        <SearchInput />
        <SuggestionBox />
      </div>
    </div>
  );
}

export default Search;
