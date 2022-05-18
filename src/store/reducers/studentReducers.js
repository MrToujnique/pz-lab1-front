import * as actionTypes from "../actions/studentActionTypes";

export const updateStudyTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_STUDY_TYPE_REQUEST:
      return { loading: true };
    case actionTypes.UPDATE_STUDY_TYPE_SUCCESS:
      return { loading: false, success: true, student: action.payload };
    case actionTypes.UPDATE_STUDY_TYPE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const joinStudentToProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.JOIN_STUDENT_TO_PROJECT_REQUEST:
      return { loading: true };
    case actionTypes.JOIN_STUDENT_TO_PROJECT_SUCCESS:
      return { loading: false, success: true, student: action.payload };
    case actionTypes.JOIN_STUDENT_TO_PROJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getStudentByEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_STUDENT_BY_EMAIL_REQUEST:
      return { loading: true };
    case actionTypes.GET_STUDENT_BY_EMAIL_SUCCESS:
      return { loading: false, success: true, student: action.payload };
    case actionTypes.GET_STUDENT_BY_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADD_STUDENT_REQUEST:
      return { loading: true };
    case actionTypes.ADD_STUDENT_SUCCESS:
      return { loading: false, success: true, student: action.payload };
    case actionTypes.ADD_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllStudentsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_STUDENTS_REQUEST:
      return { loading: true };
    case actionTypes.GET_ALL_STUDENTS_SUCCESS:
      return { loading: false, success: true, student: action.payload };
    case actionTypes.GET_ALL_STUDENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
