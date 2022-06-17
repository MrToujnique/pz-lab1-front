import { Navigate} from 'react-router-dom';
import RegisterPage from "../../pages/RegisterPage";
import ProjectList  from "../../pages/ProjectList";
import ResetPassword from "../../pages/ResetPassword";
import RemindPassword from "../../pages/RemindPassword";
import Items from "../../store/Items";
import NewStudentPage from "../../pages/NewStudentPage";
import DeleteAccountPage from "../../pages/DeleteAccountPage";
import ChangePasswordPage from "../../pages/ChangePasswordPage";
import PeopleManager from "../../pages/PeopleManager";
import StudentManager from "../../pages/StudentManager";
import LoginPage from "../../pages/LoginPage";

const token = localStorage.getItem("token");

const routes = () =>[
    { path:'/logowanie',element: !token?<LoginPage />:<Navigate to="/"/>},
    { path:'/rejestracja',element: !token?<RegisterPage />:<Navigate to="/"/>},
    { path:'/logowanie',element: !token?<LoginPage />:<Navigate to="/"/>},
    { path:'/przypomnienie-hasla',element: !token?<RemindPassword />:<Navigate to="/"/>},
    { path:'/reset-hasla/:token',element: token?<ResetPassword />:<Navigate to="/logowanie"/>},
    { path:'/kontener',element: token?<Items />:<Navigate to="/logowanie"/>},
    { path:'/nowy-student',element: token?<NewStudentPage />:<Navigate to="/logowanie"/>},
    { path:'/uzytkownicy',element: token?<PeopleManager />:<Navigate to="/logowanie"/>},
    { path:'/usuwanie-konta',element: token?<DeleteAccountPage />:<Navigate to="/logowanie"/>},
    { path:'/zmiana-hasla',element: token?<ChangePasswordPage/>:<Navigate to="/logowanie"/>},
    { path:'/studenci',element: token?<StudentManager />:<Navigate to="/logowanie"/>},
    { path:'/',element: token?<ProjectList />:<Navigate to="/logowanie"/>},
    { path:'*',element: token?<Navigate to="/" />:<Navigate to="/logowanie"/>}
]

export default routes;