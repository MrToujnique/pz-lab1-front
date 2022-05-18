import { studentEndpoints } from "../../shared/config/endpoints";
import * as actionTypes from "./studentActionTypes";
import axios from "../../axios";

export const updateStudyType = (student) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_STUDY_TYPE_REQUEST, payload: student });
  try {
    const { data } = await axios.put(studentEndpoints.updateStudyType, student);
    dispatch({ type: actionTypes.UPDATE_STUDY_TYPE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.UPDATE_STUDY_TYPE_FAIL, error: message });
  }
};

export const joinStudentToProject = (student) => async (dispatch) => {
  dispatch({
    type: actionTypes.JOIN_STUDENT_TO_PROJECT_REQUEST,
    payload: student,
  });
  try {
    const { data } = await axios.put(
      studentEndpoints.joinStudentToProject,
      student
    );
    dispatch({
      type: actionTypes.JOIN_STUDENT_TO_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: actionTypes.JOIN_STUDENT_TO_PROJECT_FAIL,
      error: message,
    });
  }
};

export const getStudentByEmail = (student) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_STUDENT_BY_EMAIL_REQUEST,
    payload: student,
  });
  try {
    const { data } = await axios.get(
      studentEndpoints.getStudentByEmail,
      student
    );
    dispatch({ type: actionTypes.GET_STUDENT_BY_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.GET_STUDENT_BY_EMAIL_FAIL, error: message });
  }
};

export const addStudent = (student) => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_STUDENT_REQUEST, payload: student });
  try {
    const { data } = await axios.post(studentEndpoints.addStudent, student);
    dispatch({ type: actionTypes.ADD_STUDENT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.ADD_STUDENT_FAIL, error: message });
  }
};

export const getAllStudents = (student) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ALL_STUDENTS_REQUEST, payload: student });
  try {
    const { data } = await axios.get(studentEndpoints.getAllStudents, student);
    dispatch({ type: actionTypes.GET_ALL_STUDENTS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.GET_ALL_STUDENTS_FAIL, error: message });
  }
};
