import React, { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import SuggestBox from './SuggestBox'
import Input from "./Input";
import useClickOutside from "../../hooks/useClickOutside";
function Search({ setSearch }) {
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

  const handleOffSearch = () => {
    setSearch(true);
  };

  useEffect(() => {
    return () => setOpenSuggestionBox(false);
  }, []);

  return (
    <div className="flex items-center justify-center w-full ">
      <IoIosClose
        onClick={handleOffSearch}
        className="text-white text-3xl mr-2  cursor-pointer"
      />
      <div ref={boxRef} className="min-w-[580px] relative h-full">
        <Input {...inputProps} />
        <SuggestBox {...suggestBoxProps} />
      </div>
    </div>
  );
}

export default Search;
