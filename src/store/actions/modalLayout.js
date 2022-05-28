import axios from "../../axios";
import { projectEndpoints } from "../../shared/config/endpoints";
import * as actionTypes from "./actionTypes";

export const createProject = (project) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_PROJECT_REQUEST });
  console.log("Project: ", project);
  try {
    const { data } = await axios
      .post(projectEndpoints.addProject, project)
      .then((res) => console.log(res.data));
    dispatch({
      type: actionTypes.CREATE_PROJECT_SUCCESS,
      payload: data.project,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.CREATE_PROJECT_FAIL, payload: message });
  }
};

export const updateProject = (project) => async (dispatch) => {
  console.log("Co przychodzi: ", project);
  const { email, projectId, status, access, name, description } = project;
  dispatch({
    type: actionTypes.UPDATE_PROJECT_REQUEST,
    payload: project,
  });
  const statusRequest = await axios
    .put(projectEndpoints.updateProjectStatus, { email, projectId, status })
    .then((res) => console.log(res.data));
  const nameRequest = await axios
    .put(projectEndpoints.updateProjectName, { email, projectId, name })
    .then((res) => console.log(res.data));
  const descriptionRequest = await axios
    .put(projectEndpoints.updateProjectDes, { email, projectId, description })
    .then((res) => console.log(res.data));
  const accessRequest = await axios
    .put(projectEndpoints.updateProjectAccess, { email, projectId, access })
    .then((res) => console.log(res.data));
  try {
    const { data } = await axios
      .all([statusRequest, nameRequest, descriptionRequest, accessRequest])
      .then(
        axios.spread((...responses) => {
          console.log(responses[0].data);
          console.log(responses[1].data);
          console.log(responses[2].data);
          console.log(responses[3].data);
        })
      );
    dispatch({
      type: actionTypes.UPDATE_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.UPDATE_PROJECT_FAIL, error: message });
  }
};

export const deleteProject = (project) => async (dispatch) => {
  dispatch({ type: actionTypes.DELETE_PROJECT_REQUEST, payload: project });
  try {
    const { data } = await axios.delete(projectEndpoints.deleteProject);
    dispatch({ type: actionTypes.DELETE_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.DELETE_PROJECT_FAIL, payload: message });
  }
};
