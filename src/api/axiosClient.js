import axios from "axios";
import queryString from "query-string";

 const instance = axios.create({
    baseURL: "http://localhost:5000",
    paramsSerializer: (params) => {
      return queryString.stringify({ ...params });
    },
  });
  
export default instance