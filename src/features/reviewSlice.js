import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createReview } from "../api/reviewsApi";

export const addReviewToDatabase = createAsyncThunk(
  "create",
  async (reviewData) => {
    const response = await createReview(reviewData);
    return response.data;
  }
);
const initialState = {
  selectedStarIndex: -1,
  selectedAvailableReviews: {},
  reviewText: "",
  isLoading: false,
  isCreateReviewSuccess: false,
  isReviewModalOpening: false,
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
    UPDATE_REVIEW_TEXT: (state, action) => {
      state.reviewText = action.payload;
    },
    CLEAR_REVIEW_DATA: (state) => {
      state.reviewText = "";
      state.selectedAvailableReviews = {};
      state.selectedStarIndex = -1;
    },
    OPEN_REVIEW_MODAL: (state) => {
      state.isReviewModalOpening = true;
    },
    CLOSE_REVIEW_MODAL: (state) => {
      state.isReviewModalOpening = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addReviewToDatabase.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addReviewToDatabase.fulfilled, (state) => {
      state.isLoading = false;
      state.isCreateReviewSuccess = true;
    });
    builder.addCase(addReviewToDatabase.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const isReviewModalOpeningSelector=state=>state.review.isReviewModalOpening
export const reviewTextSelector = (state) => state.review.reviewText;
export const selectedStarIndexSelector = (state) =>
  state.review.selectedStarIndex;
export const selectedAvailableReviewsSelector = (state) =>
  state.review.selectedAvailableReviews;
export const isLoadingSelector = (state) => state.review.isLoading;
export const isCreateReviewSuccesSelector = (state) =>
  state.review.isCreateReviewSuccess;
export const {
  UPDATE_SELECTED_AVAILABLE_REVIEWS,
  UPDATE_STAR_INDEX,
  UPDATE_REVIEW_TEXT,
  CLEAR_REVIEW_DATA,
  OPEN_REVIEW_MODAL,
  CLOSE_REVIEW_MODAL
} = reviewSlice.actions;
export default reviewSlice.reducer;
