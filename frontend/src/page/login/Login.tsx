import Divider from 'src/component/celestial-ui/Divider';
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
  </>
);

export default Login;
