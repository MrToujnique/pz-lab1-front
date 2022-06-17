import "./App.css";
import { useEffect } from "react";
import routes from "./shared/routes/routes";
import { BrowserRouter,  Router,  useRoutes } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions/index";


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state)=>state.auth.token);
  const routing = useRoutes(routes(isAuth));

  useEffect(() => {
    dispatch(actions.authCheckState())
  }, [dispatch]);
  

   
  return (
    <>
      {routing}

    </>
  );
}

export default connect(null, null)(App);
