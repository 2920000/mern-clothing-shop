import {
  CLOSE_SEARCH_HEADER,
  OPEN_SEARCH_HEADER,
} from "../features/searchSlice";

const openSearchHeader = (choice, dispatch) => {
  if (choice) {
    dispatch(OPEN_SEARCH_HEADER(choice));
    return;
  }
  dispatch(CLOSE_SEARCH_HEADER(choice));
};
export default openSearchHeader;
