import "./App.css";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { ProjectList } from "./pages/ProjectList";
import ResetPassword from "./pages/ResetPassword";
import RemindPassword from "./pages/RemindPassword";
import Items from "./store/Items";
import NewStudentPage from "./pages/NewStudentPage";
import PeopleList from "./components/PeopleList/PeopleList";
import DeleteAccountPage from "./pages/DeleteAccountPage";

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
        <Route path="/uzytkownicy" element={<PeopleList />} />
        <Route path="/usuwanieKonta" element={<DeleteAccountPage />} />
        <Route exact path="/" element={<ProjectList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
