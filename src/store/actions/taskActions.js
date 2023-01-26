import * as actionTypes from "./actionTypes";
import { taskEndpoints } from "../../shared/config/endpoints";
import axios from "../../axios";

export const getTasks = (projectId) => async (dispatch) => {
  console.log("Co wchodzi: ", projectId);
  dispatch({ type: actionTypes.GET_TASKS_REQUEST });
  try {
    const { data } = await axios.get(
      `${taskEndpoints.getTasksByProject}${projectId}`,
      {
        params: {
          page: 0,
          size: 4,
          sort: "asc",
        },
      }
    );
    dispatch({
      type: actionTypes.GET_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.GET_TASKS_FAIL, payload: message });
  }
};

export const addTask = (taskData) => async (dispatch) => {
  console.log("Co wchodzi: ", taskData);
  dispatch({ type: actionTypes.CREATE_TASK_REQUEST });
  try {
    const { data } = await axios
      .post(taskEndpoints.addTask, taskData)
      .then((res) => console.log(res.data));
    dispatch({
      type: actionTypes.CREATE_TASK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.CREATE_TASK_FAIL, payload: message });
  }
};

export const uploadResult = (resultData) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_RESULT_REQUEST });
  try {
    const { data } = await axios
      .post(taskEndpoints.addTaskResult, resultData)
      .then((res) => console.log(res.data));
    dispatch({
      type: actionTypes.CREATE_RESULT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.CREATE_RESULT_FAIL, payload: message });
  }
};
