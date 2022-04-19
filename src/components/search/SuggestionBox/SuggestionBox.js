import { useSelector } from "react-redux";
import {
  inputValueSelector,
  isSuggestionBoxOpeningSelector,
} from "../../../features/headerSlice";
import { getLocalStorage } from "../../../helper";
import CurrentSearchBox from "./CurrentSeachBox";
import SearchBox from "./SearchBox";

function SuggestionBox() {
  const isSuggestionBoxOpening = useSelector(isSuggestionBoxOpeningSelector);
  const hasValue = useSelector(inputValueSelector);

  const hasCurrentSearch = getLocalStorage("currentSearch");

  const doShowCurrentSearchBox =
    !hasValue && isSuggestionBoxOpening && hasCurrentSearch;

  if (!isSuggestionBoxOpening || (!hasValue && !hasCurrentSearch)) {
    return <></>;
  }

  return (
    <div
      className={`absolute top-[48px] z-40  w-full min-h-[50px] max-h-[570px]  rounded-sm shadow-lg bg-white py-2 px-2 `}
    >
      <span className="w-4 h-4 absolute bg-white z-[-1] top-[-6px] left-[22px]  rotate-45"></span>
      {doShowCurrentSearchBox && <CurrentSearchBox />}
      {hasValue && <SearchBox />}
    </div>
  );
}

export default SuggestionBox;
