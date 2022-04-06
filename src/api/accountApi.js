import instance from "./axiosClient";

const account = (payload) => {
    const option = payload.option;
    const data = payload.data;
    return instance.post(`/account/${option}`, {
      data,
    });
  };

  export {account}