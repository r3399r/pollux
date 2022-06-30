import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'src/component/Button';
import Form from 'src/component/Form';
import FormInput from 'src/component/FormInput';
import { Page } from 'src/constant/Page';
import { LoginForm } from 'src/model/Form';
import { openSnackbar } from 'src/redux/uiSlice';
import { login } from 'src/service/authService';
import style from './AuthLogin.module.scss';

const AuthLogin = () => {
  const methods = useForm<LoginForm>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data: LoginForm) => {
    login(data.email, data.password)
      .then(() => {
        dispatch(openSnackbar({ severity: 'success', message: '已登入' }));
      })
      .catch((e) => {
        dispatch(openSnackbar({ severity: 'error', message: e }));
      });
  };

  return (
    <Form methods={methods} onSubmit={onSubmit} className={style.self}>
      <div>
        還沒有帳號嗎？
        <Button appearance="text" type="button" onClick={() => navigate(Page.AuthRegister)}>
          註冊
        </Button>
      </div>
      <FormInput name="email" label="Email" type="email" required />
      <FormInput name="password" label="密碼" type="password" required />
      <Button size="large" type="submit">
        登入
      </Button>
      <div>
        忘記密碼？
        <Button appearance="text" type="button" onClick={() => navigate(Page.AuthForgotPassword)}>
          這裡
        </Button>
      </div>
    </Form>
  );
};

export default AuthLogin;
