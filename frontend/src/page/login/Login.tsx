import Divider from 'src/celestial-ui/component/Divider';
import ForgotForm from './component/ForgotForm';
import LoginForm from './component/LoginForm';
import RegisterForm from './component/RegisterForm';
import VerifyForm from './component/VerifyForm';

const Login = () => (
  <>
    <LoginForm />
    <Divider />
    <RegisterForm />
    <Divider />
    <VerifyForm />
    <Divider />
    <ForgotForm />
  </>
);

export default Login;
