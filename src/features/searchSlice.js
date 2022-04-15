import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductBySearch } from "../api/searchApi";

export const fetchProductsBySearch = createAsyncThunk(
  "search/query",
  async (query, thunkAPI) => {
    const response = getProductBySearch(query);
    thunkAPI.dispatch(UPDATE_CURRENT_SEARCH_PRODUCTS((await response).data));
    return (await response).data;
  }
);

const initialState = {
  preProductsBySearch: [],
  currentProductsSearch: [],
  isLoading: false,
  isSuggestionBoxOpening: false,
  isSearchHeaderOpening: false,
  inputValue: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    UPDATE_CURRENT_SEARCH_PRODUCTS: (state, action) => {
      state.currentProductsSearch = action.payload;
      state.isLoading = false;
    },
    SET_STATUS_LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    OPEN_SEARCH_HEADER: (state) => {
      state.isSearchHeaderOpening = true;
    },
    CLOSE_SEARCH_HEADER: (state) => {
      state.isSearchHeaderOpening = false;
    },
    OPEN_SUGGSETION_BOX: (state) => {
      state.isSuggestionBoxOpening = true;
    },
    CLOSE_SUGGSETION_BOX: (state) => {
      state.isSuggestionBoxOpening = false;
    },
    UPDATE_VALUE_INPUT: (state, action) => {
      state.inputValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsBySearch.fulfilled, (state, action) => {
      if (state.preProductsBySearch.length !== 0) {
        action.payload?.forEach((e) => {
          const checkExisting = state.preProductsBySearch.every(
            (preProduct) => preProduct._id !== e._id
          );
          checkExisting && state.preProductsBySearch.push(e);
        });
      } else {
        state.preProductsBySearch.push(...action.payload);
      }
      state.isLoading = false;
    });
    builder.addCase(fetchProductsBySearch.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const preProductsBySearchSelector = (state) =>
  state.search.preProductsBySearch;
export const currentProductsBySearchSelector = (state) =>
  state.search.currentProductsSearch;
export const isLoadingSelector = (state) => state.search.isLoading;
export const isSuggestionBoxOpeningSelector = (state) =>
  state.search.isSuggestionBoxOpening;
export const isSearchHeaderOpeningSelector = (state) => state.search.isSearchHeaderOpening;
export const inputValueSelector = (state) => state.search.inputValue;
export const {
  UPDATE_CURRENT_SEARCH_PRODUCTS,
  SET_STATUS_LOADING,
  CLOSE_SEARCH_HEADER,
  OPEN_SEARCH_HEADER,
  OPEN_SUGGSETION_BOX,
  CLOSE_SUGGSETION_BOX,
  UPDATE_VALUE_INPUT,
} = searchSlice.actions;
export default searchSlice.reducer;
