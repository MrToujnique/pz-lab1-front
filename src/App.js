import "./App.css";
import { useEffect } from "react";
import routes from "./shared/routes/routes";
import { BrowserRouter,  Router,  useRoutes } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions/index";

function App() {

  const routing = useRoutes(routes());
  return (
    <>
      {routing}
    </>
  );
}

export default connect(null, null)(App);
