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
    { path:'/logowanie',element: !isLoggedInd?<LoginPage />:<Navigate to="/"/>},
    { path:'/przypomnienie-hasla',element: !isLoggedInd?<RemindPassword />:<Navigate to="/"/>},
    { path:'/reset-hasla/:token',element: isLoggedInd?<ProjectList />:<Navigate to="/logowanie"/>},
    { path:'/kontener',element: isLoggedInd?<Items />:<Navigate to="/logowanie"/>},
    { path:'/nowyStudent',element: isLoggedInd?<NewStudentPage />:<Navigate to="/logowanie"/>},
    { path:'/uzytkownicy',element: isLoggedInd?<PeopleManager />:<Navigate to="/logowanie"/>},
    { path:'/usuwanieKonta',element: isLoggedInd?<DeleteAccountPage />:<Navigate to="/logowanie"/>},
    { path:'/zmianaHasla',element: isLoggedInd?<ChangePasswordPage/>:<Navigate to="/logowanie"/>},
    { path:'/studenci',element: isLoggedInd?<StudentManager />:<Navigate to="/logowanie"/>},
    { path:'/',element: isLoggedInd?<ProjectList />:<Navigate to="/logowanie"/>},
    { path:'*',element: isLoggedInd?<Navigate to="/" />:<Navigate to="/logowanie"/>}
]

export default routes;