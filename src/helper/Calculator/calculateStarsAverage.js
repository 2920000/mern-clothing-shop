const calculateStarsAverage = (params) => {
  if (!params) {
    return;
  }
  const total = params?.reduce((preComment, curComment) => {
    return preComment + curComment?.starRating;
  }, 0);
  return Math.floor(total / params?.length);
};
export default calculateStarsAverage;
