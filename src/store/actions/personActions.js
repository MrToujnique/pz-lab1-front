import * as actionTypes from "./actionTypes";
import axios from "../../axios";
import { personEndpoints } from "./../../shared/config/endpoints";

export const updatePersonRole = (person) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_PERSON_ROLE_REQUEST, payload: person });
  try {
    const { data } = await axios.put(personEndpoints.updatePersonRole, person);
    dispatch({ type: actionTypes.UPDATE_PERSON_ROLE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.UPDATE_PERSON_ROLE_FAIL, error: message });
  }
};

export const updatePersonPass = (person) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_PERSON_PASS_REQUEST, payload: person });
  try {
    const { data } = await axios.put(personEndpoints.updatePersonPass, person);
    dispatch({ type: actionTypes.UPDATE_PERSON_PASS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.UPDATE_PERSON_PASS_FAIL, error: message });
  }
};

export const updatePersonEmail = (person) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_PERSON_EMAIL_REQUEST, payload: person });
  try {
    const { data } = await axios.put(personEndpoints.updatePersonEmail, person);
    dispatch({ type: actionTypes.UPDATE_PERSON_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.UPDATE_PERSON_EMAIL_FAIL, error: message });
  }
};

export const registerPerson = (person) => async (dispatch) => {
  dispatch({ type: actionTypes.REGISTER_PERSON_REQUEST, payload: person });
  try {
    const { data } = await axios.post(personEndpoints.registerPerson, person);
    dispatch({ type: actionTypes.REGISTER_PERSON_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.REGISTER_PERSON_FAIL, error: message });
  }
};

export const confirmPersonEmail = (person, mailRole) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_PERSON_EMAIL_REQUEST, payload: person });
  try {
    const { data } = await axios.post(
      `${personEndpoints.confirmEmail}/${mailRole}`,
      person
    );
    dispatch({ type: actionTypes.UPDATE_PERSON_EMAIL_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.UPDATE_PERSON_EMAIL_FAIL, error: message });
  }
};

export const loginPerson = (person) => async (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_PERSON_REQUEST, payload: person });
  try {
    const { data } = await axios.post(personEndpoints.loginPerson, person);
    dispatch({ type: actionTypes.LOGIN_PERSON_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.LOGIN_PERSON_FAIL, error: message });
  }
};

export const getAdminToken = (person) => async (dispatch) => {
  dispatch({ type: actionTypes.ADMIN_TOKEN_REQUEST, payload: person });
  try {
    const { data } = await axios.post(personEndpoints.loginPerson, person);
    dispatch({ type: actionTypes.ADMIN_TOKEN_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.ADMIN_TOKEN_FAIL, error: message });
  }
};

export const getAllPeople = (person) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ALL_PEOPLE_REQUEST, payload: person });
  try {
    const { data } = await axios.post(personEndpoints.loginPerson, person);
    dispatch({ type: actionTypes.GET_ALL_PEOPLE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.GET_ALL_PEOPLE_FAIL, error: message });
  }
};

export const deletePerson = (person) => async (dispatch) => {
  dispatch({ type: actionTypes.DELETE_PROJECT_REQUEST, payload: person });
  try {
    const { data } = await axios.post(personEndpoints.deletePerson, person);
    dispatch({ type: actionTypes.DELETE_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: actionTypes.DELETE_PROJECT_FAIL, error: message });
  }
};
