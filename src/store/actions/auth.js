import * as actionTypes from "./actionTypes";

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
          dispatch(authSuccess(token));
        }
    };
};

export const logout = () => {
    localStorage.removeItem("token");
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

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId,
    };
};