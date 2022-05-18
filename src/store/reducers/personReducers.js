import * as actionTypes from "../actions/actionTypes";

export const updatePersonRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PERSON_ROLE_REQUEST:
      return { loading: true };
    case actionTypes.UPDATE_PERSON_ROLE_SUCCESS:
      return { loading: false, success: true, person: action.payload };
    case actionTypes.UPDATE_PERSON_ROLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatePersonPassReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PERSON_PASS_REQUEST:
      return { loading: true };
    case actionTypes.UPDATE_PERSON_PASS_SUCCESS:
      return { loading: false, success: true, person: action.payload };
    case actionTypes.UPDATE_PERSON_PASS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const updatePersonEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PERSON_EMAIL_REQUEST:
      return { loading: true };
    case actionTypes.UPDATE_PERSON_EMAIL_SUCCESS:
      return { loading: false, success: true, person: action.payload };
    case actionTypes.UPDATE_PERSON_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const registerPersonReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_PERSON_REQUEST:
      return { loading: true };
    case actionTypes.REGISTER_PERSON_SUCCESS:
      return { loading: false, success: true, person: action.payload };
    case actionTypes.REGISTER_PERSON_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const confirmPersonEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PERSON_EMAIL_REQUEST:
      return { loading: true };
    case actionTypes.UPDATE_PERSON_EMAIL_SUCCESS:
      return { loading: false, success: true, person: action.payload };
    case actionTypes.UPDATE_PERSON_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const loginPersonReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_PERSON_REQUEST:
      return { loading: true };
    case actionTypes.LOGIN_PERSON_SUCCESS:
      return { loading: false, success: true, person: action.payload };
    case actionTypes.LOGIN_PERSON_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const getAdminTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_TOKEN_REQUEST:
      return { loading: true };
    case actionTypes.ADMIN_TOKEN_SUCCESS:
      return { loading: false, success: true, person: action.payload };
    case actionTypes.ADMIN_TOKEN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllPeopleReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_PEOPLE_REQUEST:
      return { loading: true };
    case actionTypes.GET_ALL_PEOPLE_SUCCESS:
      return { loading: false, success: true, person: action.payload };
    case actionTypes.GET_ALL_PEOPLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletePersonReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.DELETE_PROJECT_REQUEST:
      return { loading: true };
    case actionTypes.DELETE_PROJECT_SUCCESS:
      return { loading: false, success: true, person: action.payload };
    case actionTypes.DELETE_PROJECT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
