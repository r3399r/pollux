import { Navigate, Route, Routes } from 'react-router-dom';
import { Page } from './constant/Page';
import Add from './page/Add';
import Home from './page/Home';

const AppRoutes = () => (
  <Routes>
    <Route path={Page.Home} element={<Home />} />
    <Route path={Page.Add} element={<Add />} />
    <Route path="*" element={<Navigate to={Page.Home} />} />
  </Routes>
);

export default AppRoutes;
