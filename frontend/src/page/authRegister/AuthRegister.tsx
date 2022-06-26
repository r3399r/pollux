import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'src/component/Button';
import Form from 'src/component/Form';
import FormInput from 'src/component/FormInput';
import { Page } from 'src/constant/Page';
import { RegisterForm } from 'src/model/Form';
import { openSnackbar } from 'src/redux/uiSlice';
import { register } from 'src/service/authService';
import style from './AuthRegister.module.scss';

const AuthRegister = () => {
  const methods = useForm<RegisterForm>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      methods.setError('confirmPassword', { message: '與密碼不同' }, { shouldFocus: true });

      return;
    }
    register({ email: data.email, password: data.password })
      .then(() => {
        dispatch(openSnackbar({ severity: 'success', message: '已寄送驗證信至您的信箱' }));
        navigate(Page.AuthVerify, { state: { email: data.email } });
      })
      .catch((e) => {
        dispatch(openSnackbar({ severity: 'error', message: e }));
      });
  };

  return (
    <Form methods={methods} onSubmit={onSubmit} className={style.self}>
      <div>
        已經有帳號嗎？
        <Button appearance="text" type="button" onClick={() => navigate(Page.AuthLogin)}>
          登入
        </Button>
      </div>
      <FormInput name="email" label="Email" type="email" required />
      <FormInput
        name="password"
        label="密碼"
        type="password"
        required
        hint="密碼需至少 8 碼且含有大小寫英文字母及數字"
      />
      <FormInput
        name="confirmPassword"
        label="確認密碼"
        type="password"
        required
        placeholder="請再次輸入密碼"
      />
      <Button size="large" type="submit">
        註冊
      </Button>
      <div>
        Email 已註冊嗎？
        <Button appearance="text" type="button" onClick={() => navigate(Page.AuthVerify)}>
          前往認證
        </Button>
      </div>
    </Form>
  );
};

export default AuthRegister;
