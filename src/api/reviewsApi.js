import instance from "./axiosClient";
const createReview = async (reviewData) => {
  return instance.post(`/reviews/create`, {
    reviewData,
  });
};
const fetchReviews = async (productId) => {
  return instance.get(`/reviews/${productId}`);
};
export { createReview ,fetchReviews};
