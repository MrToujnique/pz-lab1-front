import updateObject from "../../shared/utils/updateObject";
import * as actionTypes from "../actions/actionTypes";

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
    case actionTypes.CREATE_PROJECT_REQUEST:
      return { loading: true };
    case actionTypes.CREATE_PROJECT_SUCCESS:
      return { loading: false, success: true, project: action.payload };
    case actionTypes.CREATE_PROJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PROJECT_REQUEST:
      return { loading: true };
    case actionTypes.UPDATE_PROJECT_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.UPDATE_PROJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const projectDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.DELETE_PROJECT_REQUEST:
      return { loading: true };
    case actionTypes.DELETE_PROJECT_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.DELETE_PROJECT_FAIL:
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
