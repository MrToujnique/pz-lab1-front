import * as actionTypes from "../actions/actionTypes";

export const getTasksReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_TASKS_REQUEST:
      return { loading: true };
    case actionTypes.GET_TASKS_SUCCESS:
      return { loading: false, success: true, tasks: action.payload.content };
    case actionTypes.GET_TASKS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addTaskReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CREATE_TASK_REQUEST:
      return { loading: true };
    case actionTypes.CREATE_TASK_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case actionTypes.CREATE_TASK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
