import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './page/home';
import QuestionPage from './page/question';

const AppRoutes = () => (
  <Routes>
    <Route path="/:stage" element={<Home />} />
    <Route path="/:stage/:topic" element={<QuestionPage />} />
    <Route path="*" element={<Navigate to="/elementary" />} />
  </Routes>
);

export default AppRoutes;
