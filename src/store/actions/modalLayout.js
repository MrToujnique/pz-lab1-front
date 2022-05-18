import axios from "../../axios";
import { projectEndpoints } from "../../shared/config/endpoints";
import * as actionTypes from "./actionTypes";

export const createProject = (project) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_PROJECT_REQUEST });
  try {
    const { data } = await axios.post(projectEndpoints.addProject, project);
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

export const updateProjectStatus = (project) => async (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_PROJECT_STATUS_REQUEST,
    payload: project,
  });
  try {
    const { data } = await axios.put(
      projectEndpoints.updateProjectStatus,
      project
    );
    dispatch({
      type: actionTypes.UPDATE_PROJECT_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.UPDATE_PROJECT_STATUS_FAIL, error: message });
  }
};

export const updateProjectName = (project) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_PROJECT_NAME_REQUEST, payload: project });
  try {
    const { data } = await axios.put(
      projectEndpoints.updateProjectName,
      project
    );
    dispatch({ type: actionTypes.UPDATE_PROJECT_NAME_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.UPDATE_PROJECT_NAME_FAIL, error: message });
  }
};

export const updateProjectDes = (project) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_PROJECT_DES_REQUEST, payload: project });
  try {
    const { data } = await axios.put(
      projectEndpoints.updateProjectDes,
      project
    );
    dispatch({ type: actionTypes.UPDATE_PROJECT_DES_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.UPDATE_PROJECT_DES_FAIL, error: message });
  }
};

export const updateProjectAccess = (project) => async (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_PROJECT_ACCESS_REQUEST,
    payload: project,
  });
  try {
    const { data } = await axios.put(
      projectEndpoints.updateProjectAccess,
      project
    );
    dispatch({
      type: actionTypes.UPDATE_PROJECT_ACCESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.UPDATE_PROJECT_ACCESS_FAIL, error: message });
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
