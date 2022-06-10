import { useForm } from 'react-hook-form';
import Button from 'src/component/Button';
import Form from 'src/component/Form';
import FormInput from 'src/component/FormInput';
import style from './Login.module.scss';

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const methods = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <Form methods={methods} onSubmit={onSubmit} className={style.self}>
      <FormInput name="email" label="Email" type="email" required />
      <FormInput name="password" label="Password" type="password" required />
      <Button size="large" type="submit">
        登入
      </Button>
    </Form>
  );
};

export default Login;
