import "./App.css";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ProjectList from "./pages/ProjectList";
import ResetPassword from "./pages/ResetPassword";
import RemindPassword from "./pages/RemindPassword";
import Items from "./store/Items";
import NewStudentPage from "./pages/NewStudentPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import PeopleManager from "./pages/PeopleManager";
import StudentManager from "./pages/StudentManager";
import AvailableProjectsPage from "./pages/AvailableProjectsPage";

function App() {
  return (
    <BrowserRouter>
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
        <Route path="/wolneProjekty" element={<AvailableProjectsPage />} />
        <Route exact path="/" element={<ProjectList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
