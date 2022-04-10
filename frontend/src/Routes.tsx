import { Navigate, Route, Routes } from 'react-router-dom';
import { Page } from './constant/Page';
import Landing from './page/landing/Landing';
import User from './page/user/User';

const AppRoutes = () => (
  <Routes>
    <Route path={Page.Landing} element={<Landing />} />
    <Route path={Page.User} element={<User />} />
    <Route path="/*" element={<Navigate to={Page.Landing} />} />
  </Routes>
);

export default AppRoutes;
