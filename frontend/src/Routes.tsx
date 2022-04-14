import { Navigate, Route, Routes } from 'react-router-dom';
import { Page } from './constant/Page';
import Landing from './page/landing/Landing';
import NewQuestion from './page/newQuestion/NewQuestion';
import Student from './page/student/Student';
import Teacher from './page/teacher/Teacher';
import User from './page/user/User';

const AppRoutes = () => (
  <Routes>
    <Route path={Page.Landing} element={<Landing />} />
    <Route path={Page.Student} element={<Student />} />
    <Route path={Page.Teacher} element={<Teacher />} />
    <Route path={Page.NewQuestion} element={<NewQuestion />} />
    <Route path={Page.User} element={<User />} />
    <Route path="/*" element={<Navigate to={Page.Landing} />} />
  </Routes>
);

export default AppRoutes;
