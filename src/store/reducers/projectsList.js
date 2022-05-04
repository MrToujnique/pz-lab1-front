import updateObject from "../../shared/utils/updateObject";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    loading:false,
    projectsList:[]
}

const fetchProjectsListStart = (state, action) => {
    return updateObject(state, { loading: true });
};
  
const fetchProjectsListSuccess = (state, action) => {
    return updateObject(state, { addresses: action.addresses, loading: false });
};
  
const fetchProjectsListFailed = (state, action) => {
    return updateObject(state, { loading: false });
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