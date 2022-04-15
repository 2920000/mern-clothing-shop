import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedStarIndex: -1,
  selectedAvailableReviews: {},
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    UPDATE_STAR_INDEX: (state, action) => {
      state.selectedStarIndex = action.payload;
    },
    UPDATE_SELECTED_AVAILABLE_REVIEWS: (state, action) => {
      state.selectedAvailableReviews = action.payload;
    },
  },
});

export const selectedStarIndexSelector = (state) =>
  state.review.selectedStarIndex;
export const selectedAvailableReviewsSelector = (state) =>
  state.review.selectedAvailableReviews;
export const { UPDATE_SELECTED_AVAILABLE_REVIEWS, UPDATE_STAR_INDEX } =
  reviewSlice.actions;
export default reviewSlice.reducer;
