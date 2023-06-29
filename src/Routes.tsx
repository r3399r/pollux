import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './page/home';
import QuestionPage from './page/question';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:type" element={<QuestionPage />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRoutes;
