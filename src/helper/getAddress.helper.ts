import axios from "axios";

export const getAddress = () => {
  return axios
    .get("https://provinces.open-api.vn/api/?depth=2")
    .then((result) => {
      return result.data;
    })
    .catch((err) => console.log("err"));
};
