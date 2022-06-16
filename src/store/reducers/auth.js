import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../shared/utils/updateObject";

const initialState ={
    token:null
}

const authSuccess = (state, action) => {
    return updateObject(state, {
      token: action.idToken,
    });
};

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.AUTH_SUCCESS:
        return authSuccess(state, action);
      case actionTypes.AUTH_LOGOUT:
        return authLogout(state);
      default:
        return state;
    }
  };
  
  export default reducer;