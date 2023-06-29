import { Navigate, Route, Routes } from 'react-router-dom';
import QuestionPage from './page/question';

const AppRoutes = () => (
  <Routes>
    <Route path="/:type" element={<QuestionPage />} />
    <Route path="*" element={<Navigate to="/add-10" />} />
  </Routes>
);

export default AppRoutes;
