import { SET_SEARCH_HEADER } from "../features/searchSlice";

const openSearchHeader = (choice,dispatch) => {
  dispatch(SET_SEARCH_HEADER(choice));
};
export default openSearchHeader;
