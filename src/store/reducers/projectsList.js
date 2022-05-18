import updateObject from "../../shared/utils/updateObject";
import * as actionTypes from "../actions/actionTypes";
import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  UPDATE_PROJECT_STATUS_REQUEST,
  UPDATE_PROJECT_STATUS_SUCCESS,
  UPDATE_PROJECT_STATUS_FAIL,
  UPDATE_PROJECT_NAME_REQUEST,
  UPDATE_PROJECT_NAME_SUCCESS,
  UPDATE_PROJECT_NAME_FAIL,
  UPDATE_PROJECT_DES_REQUEST,
  UPDATE_PROJECT_DES_SUCCESS,
  UPDATE_PROJECT_DES_FAIL,
  UPDATE_PROJECT_ACCESS_REQUEST,
  UPDATE_PROJECT_ACCESS_SUCCESS,
  UPDATE_PROJECT_ACCESS_FAIL,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  projectsList: [],
};

const fetchProjectsListStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchProjectsListSuccess = (state, action) => {
  return updateObject(state, { addresses: action.addresses, loading: false });
};

const fetchProjectsListFailed = (state, action) => {
  return updateObject(state, { loading: false });
};

export const createProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROJECT_REQUEST:
      return { loading: true };
    case CREATE_PROJECT_SUCCESS:
      return { loading: false, success: true, project: action.payload };
    case CREATE_PROJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProjectStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROJECT_STATUS_REQUEST:
      return { loading: true };
    case UPDATE_PROJECT_STATUS_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_PROJECT_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProjectNameReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROJECT_NAME_REQUEST:
      return { loading: true };
    case UPDATE_PROJECT_NAME_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_PROJECT_NAME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProjectDesReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROJECT_DES_REQUEST:
      return { loading: true };
    case UPDATE_PROJECT_DES_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_PROJECT_DES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProjectAccessReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROJECT_ACCESS_REQUEST:
      return { loading: true };
    case UPDATE_PROJECT_ACCESS_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_PROJECT_ACCESS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const projectDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PROJECT_REQUEST:
      return { loading: true };
    case DELETE_PROJECT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PROJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS_LIST_FAIL:
      return fetchProjectsListFailed(state, action);
    case actionTypes.FETCH_PROJECTS_LIST_START:
      return fetchProjectsListStart(state, action);
    case actionTypes.FETCH_PROJECTS_LIST_SUCCESS:
      return fetchProjectsListSuccess(state, action);
    default:
      return state;
  }
};
export default reducer;
