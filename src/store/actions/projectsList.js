import * as actionTypes from "./actionTypes";
import {projectEndpoints} from "../../shared/config/endpoints";
import axios from "../../axios";

export const fetchProjectsListFail = (err) => {
    return {
        type: actionTypes.FETCH_PROJECTS_LIST_FAIL,
        error: err,
    };
};
  
export const fetchProjectsListSuccess = (projectsList) => {
    return { type: actionTypes.FETCH_PROJECTS_LIST_SUCCESS, projectsList: projectsList };
};
  
export const fetchProjectsListStart = () => {
    return {
        type: actionTypes.FETCH_PROJECTS_LIST_START,
    };
};

export const fetchProjectsList = (data) => {
    return (dispatch) => {
      dispatch(fetchProjectsListStart());
      axios
        .get(projectEndpoints.getProjectsList,{
            params:{
                page:0,
                size:10,
                sort:'asc'
            }
        })
        .then((resp) => {
            console.log(resp);
          dispatch(fetchProjectsListSuccess(resp));
        })
        .catch((err) => {
          dispatch(fetchProjectsListFail(err.response.data.message));
          console.log(err.response)
        });
    };
};
