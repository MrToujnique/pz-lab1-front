import "./App.css";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { ProjectList } from "./pages/ProjectList";
import ResetPassword from "./pages/ResetPassword";
import RemindPassword from "./pages/RemindPassword";
import Items from "./store/Items";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rejestracja" element={<RegisterPage />} />
        <Route path="/logowanie" element={<LoginPage />} />
        <Route path="/przypomnienie-hasla" element={<RemindPassword />} />
        <Route path="/reset-hasla/:token" element={<ResetPassword />} />
        <Route path="/kontener" element={<Items />} />
        <Route exact path="/" element={<ProjectList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
