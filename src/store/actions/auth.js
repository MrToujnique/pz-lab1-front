import * as actionTypes from "./actionTypes";

export const authCheckState = () => {
  return (dispatch) => {
    dispatch(authStart(true));
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, false));
    }
  };
};

export const authStart = (checkingState) => {
  return {
    type: actionTypes.AUTH_START,
    checking: checkingState,
  };
};
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationDate) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationDate);
  };
};

export const authSuccess = (idToken, checkingState) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: idToken,
    checking: checkingState,
  };
};
