const replaceWhitespace = (str = "") => {
  let res = "";
  const { length } = str;
  for (let i = 0; i < length; i++) {
    const char = str[i];
    if (!(char === " ")) {
      res += char;
    } else {
      res += "%20";
    }
  }
  return res;
};
export default replaceWhitespace;
