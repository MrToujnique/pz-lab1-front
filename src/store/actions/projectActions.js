import axios from "../../axios";
import { projectEndpoints } from "../../shared/config/endpoints";
import * as actionTypes from "./actionTypes";

export const createProject = (project) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_PROJECT_REQUEST });
  console.log("Project: ", project);
  try {
    const { data } = await axios
      .post(projectEndpoints.addProject, project)
      .then(() => window.location.reload(false));
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
  dispatch({
    type: actionTypes.UPDATE_PROJECT_REQUEST,
    payload: project,
  });
  try {
    const { data } = await axios.put(projectEndpoints.putProject, project);
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
  console.log("Co dostaje: ", project);
  dispatch({ type: actionTypes.DELETE_PROJECT_REQUEST, payload: project });
  try {
    const { data } = await axios
      .delete(projectEndpoints.deleteProject, { data: project })
      .then((res) => console.log(res.data));
    dispatch({ type: actionTypes.DELETE_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.DELETE_PROJECT_FAIL, payload: message });
  }
};
