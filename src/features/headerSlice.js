import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductBySearch } from "../api/searchApi";

export const fetchProductsBySearch = createAsyncThunk(
  "search/query",
  async (query, thunkAPI) => {
    const response = await getProductBySearch(query);
    thunkAPI.dispatch(UPDATE_CURRENT_SEARCH_PRODUCTS(response));
    return response;
  }
);

const initialState = {
  search: {
    preProductsBySearch: [],
    currentProductsSearch: [],
    isLoading: false,
    isSuggestionBoxOpening: false,
    isSearchHeaderOpening: false,
    inputValue: "",
  },
  mobileNav: {
    isMobileNavOpening: false,
  },
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    UPDATE_CURRENT_SEARCH_PRODUCTS: (state, action) => {
      state.search.currentProductsSearch = action.payload;
      state.search.isLoading = false;
    },
    SET_STATUS_LOADING: (state, action) => {
      state.search.isLoading = action.payload;
    },
    OPEN_SEARCH_HEADER: (state) => {
      state.search.isSearchHeaderOpening = true;
    },
    CLOSE_SEARCH_HEADER: (state) => {
      state.search.isSearchHeaderOpening = false;
    },
    OPEN_SUGGSETION_BOX: (state) => {
      state.search.isSuggestionBoxOpening = true;
    },
    CLOSE_SUGGSETION_BOX: (state) => {
      state.search.isSuggestionBoxOpening = false;
    },
    UPDATE_VALUE_INPUT: (state, action) => {
      state.search.inputValue = action.payload;
      state.search.isLoading = true;
      state.search.isSuggestionBoxOpening = true;
    },
    OPEN_MOBILE_NAV: (state) => {
      state.mobileNav.isMobileNavOpening = true;
    },
    CLOSE_MOBILE_NAV: (state) => {
      state.mobileNav.isMobileNavOpening = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsBySearch.fulfilled, (state, action) => {
      if (state.search.preProductsBySearch.length !== 0) {
        action.payload?.forEach((e) => {
          const checkExisting = state.search.preProductsBySearch.every(
            (preProduct) => preProduct._id !== e._id
          );
          checkExisting && state.search.preProductsBySearch.push(e);
        });
      } else {
        state.search.preProductsBySearch.push(...action.payload);
      }
      state.search.isLoading = false;
    });
    // builder.addCase(fetchProductsBySearch.pending, (state) => {
    //   state.search.isLoading = true;
    // });
  },
});

export const isMobileNavOpeningSelector = (state) =>
  state.header.mobileNav.isMobileNavOpening;
export const preProductsBySearchSelector = (state) =>
  state.header.search.preProductsBySearch;
export const currentProductsBySearchSelector = (state) =>
  state.header.search.currentProductsSearch;
export const isLoadingSelector = (state) => state.header.search.isLoading;
export const isSuggestionBoxOpeningSelector = (state) =>
  state.header.search.isSuggestionBoxOpening;
export const isSearchHeaderOpeningSelector = (state) =>
  state.header.search.isSearchHeaderOpening;
export const inputValueSelector = (state) => state.header.search.inputValue;
export const {
  UPDATE_CURRENT_SEARCH_PRODUCTS,
  SET_STATUS_LOADING,
  CLOSE_SEARCH_HEADER,
  OPEN_SEARCH_HEADER,
  OPEN_SUGGSETION_BOX,
  CLOSE_SUGGSETION_BOX,
  UPDATE_VALUE_INPUT,
  OPEN_MOBILE_NAV,
  CLOSE_MOBILE_NAV,
} = headerSlice.actions;
export default headerSlice.reducer;
