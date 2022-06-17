import { Navigate,Outlet } from 'react-router-dom';
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

const routes = (isLoggedInd) =>[
    { path:'/logowanie',element: !isLoggedInd?<LoginPage />:<Navigate to="/studenci"/>},
    { path:'/rejestracja',element: !isLoggedInd?<RegisterPage />:<Navigate to="/projekty"/>},
    { path:'/logowanie',element: !isLoggedInd?<LoginPage />:<Navigate to="/projekty"/>},
    { path:'/przypomnienie-hasla',element: !isLoggedInd?<RemindPassword />:<Navigate to="/projekty"/>},
    { path:'/reset-hasla/:token',element: isLoggedInd?<ResetPassword />:<Navigate to="/logowanie"/>},
    { path:'/kontener',element: isLoggedInd?<Items />:<Navigate to="/logowanie"/>},
    { path:'/nowy-student',element: isLoggedInd?<NewStudentPage />:<Navigate to="/logowanie"/>},
    { path:'/uzytkownicy',element: isLoggedInd?<PeopleManager />:<Navigate to="/logowanie"/>},
    { path:'/usuwanie-konta',element: isLoggedInd?<DeleteAccountPage />:<Navigate to="/logowanie"/>},
    { path:'/zmiana-hasla',element: isLoggedInd?<ChangePasswordPage/>:<Navigate to="/logowanie"/>},
    { path:'/studenci',element: isLoggedInd?<StudentManager />:<Navigate to="/logowanie"/>},
    { path:'/projekty',element: isLoggedInd?<ProjectList />:<Navigate to="/logowanie"/>},
    { path:'*',element: isLoggedInd?<Navigate to="/projekty" />:<Navigate to="/logowanie"/>}
]

export default routes;