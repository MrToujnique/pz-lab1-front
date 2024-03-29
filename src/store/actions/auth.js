import { useNavigate } from "react-router-dom";
import routes from "../../shared/routes/routes";
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
  localStorage.removeItem("userType");
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

// export const checkToken = () => {
//   if (!localStorage.hasOwnProperty("token")) {
//     history.pu("/logowanie");
//   }
// };
