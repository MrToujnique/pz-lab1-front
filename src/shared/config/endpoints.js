const API_URL = "https://project-menegment-api.herokuapp.com";

export const authEndpoints = {
  register: API_URL + "/person/reg",
  login: API_URL + "/person/log",
  updatePassword: API_URL + "/person/pass/"
};

export const projectEndpoints ={
  getProjectsList: API_URL + "/project/list"
}
