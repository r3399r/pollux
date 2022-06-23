import { Navigate, Route, Routes } from 'react-router-dom';
import { Page } from './constant/Page';
import BankDetail from './page/bankDetail/BankDetail';
import Landing from './page/landing/Landing';
import Login from './page/login/Login';
import NewBank from './page/newBank/NewBank';
import NewQuestion from './page/newQuestion/NewQuestion';
import Register from './page/register/Register';
import Student from './page/student/Student';
import Teacher from './page/teacher/Teacher';
import User from './page/user/User';

const AppRoutes = () => (
  <Routes>
    <Route path={Page.Landing} element={<Landing />} />
    <Route path={Page.Student} element={<Student />} />
    <Route path={Page.Teacher} element={<Teacher />} />
    <Route path={Page.NewBank} element={<NewBank />} />
    <Route path={`${Page.Bank}/:id`} element={<BankDetail />} />
    <Route path={Page.NewQuestion} element={<NewQuestion />} />
    <Route path={Page.User} element={<User />} />
    <Route path={Page.Login} element={<Login />} />
    <Route path={Page.Register} element={<Register />} />
    <Route path="/*" element={<Navigate to={Page.Landing} />} />
  </Routes>
);

export default AppRoutes;
