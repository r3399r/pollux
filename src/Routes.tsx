import { Navigate, Route, Routes } from 'react-router-dom';
import Add from './page/Question';

const AppRoutes = () => (
  <Routes>
    <Route path="/:type" element={<Add />} />
    <Route path="*" element={<Navigate to="/add10" />} />
  </Routes>
);

export default AppRoutes;
