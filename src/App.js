import "./App.css";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ProjectList  from "./pages/ProjectList";
import ResetPassword from "./pages/ResetPassword";
import RemindPassword from "./pages/RemindPassword";
import Items from "./store/Items";
import NewStudentPage from "./pages/NewStudentPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import PeopleManager from "./pages/PeopleManager";
import StudentManager from "./pages/StudentManager";
import { connect, useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions/index";


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state)=>state.auth.token);

  useEffect(() => {
    dispatch(actions.authCheckState())
  }, [dispatch, isAuth]);
  
  let routesList = isAuth?(
    <Routes>
      <Route path="/rejestracja" element={<RegisterPage />} />
      <Route path="/logowanie" element={<LoginPage />} />
      <Route path="/przypomnienie-hasla" element={<RemindPassword />} />
      <Route path="/reset-hasla/:token" element={<ResetPassword />} />
      <Route path="/kontener" element={<Items />} />
      <Route path="/nowyStudent" element={<NewStudentPage />} />
      <Route path="/uzytkownicy" element={<PeopleManager />} />
      <Route path="/usuwanieKonta" element={<DeleteAccountPage />} />
      <Route path="/zmianaHasla" element={<ChangePasswordPage />} />
      <Route path="/studenci" element={<StudentManager />} />
      <Route exact path="/" element={<ProjectList />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  ):( 
    <Routes>
      <Route path="/rejestracja" element={<RegisterPage />} />
      <Route path="/logowanie" element={<LoginPage />} />
      <Route path="/przypomnienie-hasla" element={<RemindPassword />} />
      <Route path="/reset-hasla/:token" element={<ResetPassword />} />
      <Route path="*" element={<Navigate replace to="/logowanie" />} />
    </Routes>
  );
   
  return (
    <BrowserRouter>
      {routesList}
    </BrowserRouter>
  );
}

export default connect(null, null)(App);
