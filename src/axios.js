import axios from "axios";

axios.interceptors.request.use((request) => {
  request.headers = {
    "Content-Type": "application/json",

    Authorization: "Bearer " + localStorage.getItem("token"),

  };
  return request;
});

export default axios;
