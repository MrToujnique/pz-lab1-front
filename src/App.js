import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import { ProjectList } from "./pages/ProjectList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rejestracja" element={<RegisterPage />} />
        <Route path="/logowanie" element={<LoginPage />} />
        <Route exact path="/" element={<ProjectList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
