import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductBySearch } from "../api/searchApi";
const fetchProductsBySearch = createAsyncThunk(
  "search/query",
  async (query, thunkAPI) => {
    const response = getProductBySearch(query);
    thunkAPI.dispatch(GET_CURRENT_SEARCH_PRODUCTS((await response).data));
    return (await response).data;
  }
);
const initialState = {
  preProductsBySearch: [],
  loading: false,
  currentProductsSearch: [],
  isOpen:false
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    GET_CURRENT_SEARCH_PRODUCTS: (state, action) => {
      state.currentProductsSearch = action.payload;
      state.loading=false
    },
    FINDING_PRODUCT: (state, action) => {
      state.loading = action.payload;
    },
    SET_SEARCH_HEADER:(state,action)=>{
      state.isOpen=action.payload
    }
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
      state.loading = false;
    });
    builder.addCase(fetchProductsBySearch.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export { fetchProductsBySearch };
export const preProductsBySearchSelector = (state) =>
  state.search.preProductsBySearch;
export const currentProductsBySearchSelector = (state) =>
  state.search.currentProductsSearch;
export const loadingSelector = (state) => state.search.loading;
export const isOpenSelector=(state)=>state.search.isOpen
export const { GET_CURRENT_SEARCH_PRODUCTS, FINDING_PRODUCT,SET_SEARCH_HEADER } =
  searchSlice.actions;
export default searchSlice.reducer;
