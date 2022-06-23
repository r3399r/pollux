import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'src/component/Button';
import Form from 'src/component/Form';
import FormInput from 'src/component/FormInput';
import { Page } from 'src/constant/Page';
import { VerifyForm } from 'src/model/Form';
import { openSnackbar } from 'src/redux/uiSlice';
import { resend, verify } from 'src/service/authService';
import style from './AuthVerify.module.scss';

const AuthVerify = () => {
  const methods = useForm<VerifyForm>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [leftTime, setLeftTime] = useState<number>(0);

  useEffect(() => {
    const state = location.state as { email: string } | null;
    if (state?.email) methods.setValue('email', state.email);
  }, [location]);

  useEffect(() => {
    if (leftTime < 0) return;
    const timer = setTimeout(() => {
      setLeftTime(leftTime - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [leftTime]);

  const onSubmit = (data: VerifyForm) => {
    verify(data)
      .then(() => {
        dispatch(openSnackbar({ severity: 'success', message: '已認證成功' }));
      })
      .catch((e) => {
        dispatch(openSnackbar({ severity: 'error', message: e }));
      });
  };

  const onResend = () => {
    resend({ email: methods.getValues('email') })
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
        <Button appearance="text" type="button" onClick={() => navigate(Page.Login)}>
          登入
        </Button>
      </div>
      <div>
        尚未註冊嗎？
        <Button appearance="text" type="button" onClick={() => navigate(Page.Register)}>
          註冊
        </Button>
      </div>
      <FormInput name="email" label="Email" type="email" required />
      <div className={style.right}>
        <Button
          appearance="text"
          type="button"
          onClick={onResend}
          disabled={
            methods.watch('email') === undefined || methods.watch('email') === '' || leftTime > 0
          }
        >
          {leftTime > 0 ? leftTime : '重寄認證碼'}
        </Button>
      </div>
      <FormInput name="code" label="認證碼" type="number" required />
      <Button size="large" type="submit">
        認證
      </Button>
    </Form>
  );
};

export default AuthVerify;
