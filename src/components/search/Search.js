import React, { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { openSearchHeader } from "../../helper";
import useClickOutside from "../../hooks/useClickOutside";
import SearchInput from "./SearchInput";
import SuggestBox from "./suggest-box";
function Search() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [openSuggestionBox, setOpenSuggestionBox] = useState(false);

  const boxRef = useRef();
  useClickOutside(boxRef, () => {
    setOpenSuggestionBox(false);
  });

  const inputProps = {
    setOpenSuggestionBox,
    setInput,
    input,
  };

  const suggestBoxProps = {
    input,
    openSuggestionBox,
  };

  useEffect(() => {
    return () => setOpenSuggestionBox(false);
  }, []);

  return (
    <div className="flex items-center justify-center w-full">
      <IoIosClose
        onClick={() => openSearchHeader(false, dispatch)}
        className="text-white text-3xl mr-2  cursor-pointer"
      />
      <div ref={boxRef} className=" w-full max-w-[580px] flex relative h-full">
        <SearchInput {...inputProps} />
        <SuggestBox {...suggestBoxProps} />
      </div>
    </div>
  );
}

export default Search;
