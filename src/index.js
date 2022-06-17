import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import projectListReducer, {
  createProjectReducer,
  updateProjectReducer,
  updateProjectStatusReducer,
  updateProjectAccessReducer,
  updateProjectDesReducer,
  updateProjectNameReducer,
} from "./store/reducers/projectsList";
import authReducer from "./store/reducers/auth";
import { addTaskReducer, getTasksReducer } from "./store/reducers/taskReducers";

const composeEnhancers =
  process.env.REACT_APP_DEVELOPMENT === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const rootReducer = combineReducers({
  auth: authReducer,
  projectList: projectListReducer,
  createProject: createProjectReducer,
  updateProject: updateProjectReducer,
  getTasks: getTasksReducer,
  addTask: addTaskReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
