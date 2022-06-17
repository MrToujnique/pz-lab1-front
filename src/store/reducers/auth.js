import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../shared/utils/updateObject";

const initialState ={
    checking:false,
    token:null
}

const authSuccess = (state, action) => {
    return updateObject(state, {
      token: action.token,
      checking: action.checking,
    });
};

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
    });
};
const authStart = (state, action) => {
    return updateObject(state, {
        checking: action.checking,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.AUTH_START:
        return authStart(state, action);     
      case actionTypes.AUTH_SUCCESS:
        return authSuccess(state, action);
      case actionTypes.AUTH_LOGOUT:
        return authLogout(state);
      default:
        return state;
    }
  };
  
  export default reducer;