import instance from "./axiosClient";
const createRating = async (ratingData) => {
  return instance.post(`/rating/create`, {
    ratingData,
  });
};

export { createRating};
