const API_URL = "http://localhost:8080";

export const authEndpoints = {
  register: API_URL + "/person/reg",
  login: API_URL + "/person/log",
  updatePassword: API_URL + "/person/pass/",
};

export const projectEndpoints = {
  getProjectsList: API_URL + "/project/list",
  getProject: API_URL + "/project/",
  addProject: API_URL + "/project",
  putProject: API_URL + "/project",
  updateProjectStatus: API_URL + "/project/status",
  updateProjectName: API_URL + "/project/name",
  updateProjectDes: API_URL + "/project/des",
  updateProjectAccess: API_URL + "/project/access",
  deleteProject: API_URL + "/project",
  getAvailableProjects: API_URL + "/project/available",
};

export const personEndpoints = {
  updatePersonRole: API_URL + "/person/role",
  updatePersonPass: API_URL + "/person/pass",
  updatePersonEmail: API_URL + "/person/email",
  registerPerson: API_URL + "/person/reg",
  loginPerson: API_URL + "/person/log",
  getPersonToken: API_URL + "/person/token",
  getAdminToken: API_URL + "/person/admin",
  getAllPeople: API_URL + "/person/all",
  deletePerson: API_URL + "/person",
};

export const studentEndpoints = {
  updateStudyType: API_URL + "/student/type",
  joinStudentToProject: API_URL + "/student/join/",
  getStudentByEmail: API_URL + "/student",
  addStudent: API_URL + "/student",
  getAllStudents: API_URL + "/student/all",
};

export const taskEndpoints = {
  getTasksByProject: API_URL + "/task/project/",
  addTask: API_URL + "/task",
  addTaskResult: API_URL + "/res",
  getTaskFile: API_URL + "/res/file/",
  getTaskResultsByTask: API_URL + "/res/task/",
};
