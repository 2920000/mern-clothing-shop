import instance from "./axiosClient";

const ratingApi = {
  add: async (ratingData) => {
    return instance.post(`/rating/create`, {
      ratingData,
    });
  },
};
export default ratingApi;
