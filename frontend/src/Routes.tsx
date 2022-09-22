import { Navigate, Route, Routes } from 'react-router-dom';
import { Page } from './constant/Page';
import Bank from './page/bank/Bank';
import BankDetail from './page/bankDetail/BankDetail';
import Landing from './page/landing/Landing';
import Login from './page/login/Login';
import Question from './page/question/Question';
import QuestionEdit from './page/questionEdit/QuestionEdit';
import Tag from './page/tag/Tag';

const AppRoutes = () => (
  <Routes>
    <Route path={Page.Landing} element={<Landing />} />
    <Route path={Page.Login} element={<Login />} />
    <Route path={Page.Question} element={<Question />} />
    <Route path={`${Page.Question}/edit`} element={<QuestionEdit />} />
    <Route path={Page.Bank} element={<Bank />} />
    <Route path={`${Page.Bank}/:id`} element={<BankDetail />} />
    <Route path={Page.Tag} element={<Tag />} />
    <Route path="/*" element={<Navigate to={Page.Landing} />} />
  </Routes>
);

export default AppRoutes;
