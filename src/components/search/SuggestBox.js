import React from "react";
import { getLocalStorage } from "../../helper/localStoragefunction";
import CurrentSearchBox from "./CurrentSeachBox";
import SearchBox from "./SearchBox";

function SuggestBox({ input, openSuggestionBox }) {
  const boxProp = {
    input,
    openSuggestionBox,
  };
  if (!openSuggestionBox) {
    return <></>;
  }
  return (
    <div
      className={`absolute top-[48px] z-40  w-full min-h-[50px] max-h-[570px]  rounded-sm shadow-lg bg-white py-2 px-2 `}
    >
      <span className="w-4 h-4 absolute bg-white z-[-1] top-[-6px] left-[22px]  rotate-45"></span>
      <Box {...boxProp} />
    </div>
  );
}

export default SuggestBox;

const Box = ({ input, openSuggestionBox }) => {
  const currentSearchFromLocal = getLocalStorage("currentSearch");

  if (!input && openSuggestionBox && currentSearchFromLocal) {
    return <CurrentSearchBox />;
  }

  return <SearchBox/>;
};
