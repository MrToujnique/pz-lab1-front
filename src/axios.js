import axios from "axios";

axios.interceptors.request.use((request) => {
  request.headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QucGwiLCJpYXQiOjE2NTI4NjkzODksImV4cCI6MTY1Mjk1NTc4OX0.o_NDz5HjEqAMNyDs1hHZEdX_ek9oXXMRMMAFKbr4H4PVLSNPpzMqOqwE1fmmHJDytSpEyMflunTxaw_SJOl2TA",
  };
  return request;
});

export default axios;
