import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from 'src/component/Button';
import Form from 'src/component/Form';
import FormInput from 'src/component/FormInput';
import { Page } from 'src/constant/Page';
import { ForgotForm } from 'src/model/Form';
import { openSnackbar } from 'src/redux/uiSlice';
import { confirm, forgot } from 'src/service/authService';
import style from './AuthForgotPassword.module.scss';

const AuthForgotPassword = () => {
  const methods = useForm<ForgotForm>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [leftTime, setLeftTime] = useState<number>(0);

  useEffect(() => {
    if (leftTime < 0) return;
    const timer = setTimeout(() => {
      setLeftTime(leftTime - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [leftTime]);

  const onSubmit = (data: ForgotForm) => {
    confirm(data)
      .then(() => {
        dispatch(openSnackbar({ severity: 'success', message: '設定成功，請使用新密碼登入' }));
        navigate(Page.AuthLogin);
      })
      .catch((e) => {
        dispatch(openSnackbar({ severity: 'error', message: e }));
      });
  };

  const onForgot = () => {
    forgot({ email: methods.getValues('email') })
      .then(() => {
        dispatch(openSnackbar({ severity: 'success', message: '已寄送驗證信至您的信箱' }));
        setLeftTime(30);
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
      <div className={style.right}>
        <Button
          appearance="text"
          type="button"
          onClick={onForgot}
          disabled={
            methods.watch('email') === undefined || methods.watch('email') === '' || leftTime > 0
          }
        >
          {leftTime > 0 ? leftTime : '寄送認證碼'}
        </Button>
      </div>
      <FormInput name="newPassword" label="新密碼" type="password" required />
      <FormInput name="code" label="認證碼" type="number" required />
      <Button size="large" type="submit">
        註冊
      </Button>
    </Form>
  );
};

export default AuthForgotPassword;
