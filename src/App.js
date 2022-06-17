import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import RemindPassword from "./pages/RemindPassword";
import ResetPassword from "./pages/ResetPassword";
import Items from "./store/Items";
import NewStudentPage from "./pages/NewStudentPage";
import PeopleManager from "./pages/PeopleManager";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import StudentManager from "./pages/StudentManager";
import ProjectList from "./pages/ProjectList";
import ProtectedRoutes from "./shared/utils/ProtectedRoutes";


function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes/>}>
        <Route path="/kontener" element={<Items />} />
        <Route path="/nowy-student" element={<NewStudentPage />} />
        <Route path="/uzytkownicy" element={<PeopleManager />} />
        <Route path="/usuwanie-konta" element={<DeleteAccountPage />} />
        <Route path="/zmiana-hasla" element={<ChangePasswordPage />} />
        <Route path="/studenci" element={<StudentManager />} />
        <Route path="/projekty" element={<ProjectList />} />
      </Route>
      <Route path="/rejestracja" element={<RegisterPage />} />
      <Route path="/logowanie" element={<LoginPage />} />
      <Route path="/przypomnienie-hasla" element={<RemindPassword />} />
      <Route path="/reset-hasla/:token" element={<ResetPassword />} />
      <Route path="*" element={<Navigate replace to="/projekty" />} />
    </Routes>
  );
}

export default App;
