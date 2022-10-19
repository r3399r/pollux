import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/component/celestial-ui/Button';
import Form from 'src/component/celestial-ui/Form';
import FormInput from 'src/component/celestial-ui/FormInput';
import H1 from 'src/component/celestial-ui/typography/H1';
import { ForgotForm as FormType } from 'src/model/Form';
import { confirmForgot, sendForgot } from 'src/service/authService';

const ForgotForm = () => {
  const methods = useForm<FormType>();
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string>();

  const onSubmit = (data: FormType) => {
    if (data.newPassword !== data.confirmPassword)
      methods.setError('confirmPassword', { message: '與密碼不同' }, { shouldFocus: true });
    else
      confirmForgot(data.email, data.newPassword, data.code)
        .then(() => {
          setMessage('修改成功，請使用新密碼登入');
          setError(undefined);
        })
        .catch((e) => {
          setMessage(undefined);
          setError(e);
        });
  };

  const onSend = () => {
    sendForgot(methods.getValues('email')).catch((e) => {
      methods.setError('email', { message: e });
    });
  };

  return (
    <>
      <H1>忘記密碼</H1>
      <Form methods={methods} onSubmit={onSubmit}>
        <div className="flex gap-3 w-full">
          <div className="flex-1">
            <FormInput name="email" label="Email" type="email" required />
          </div>
          <div>
            <Button className="mt-[42px]" type="button" appearance="secondary" onClick={onSend}>
              寄送驗證碼
            </Button>
          </div>
        </div>
        <FormInput name="newPassword" label="新密碼" type="password" required />
        <FormInput
          name="confirmPassword"
          label="確認密碼"
          type="password"
          required
          placeholder="請再次輸入密碼"
        />
        <FormInput name="code" label="驗證碼" type="password" required />
        <Button type="submit" className="mt-5">
          送出
        </Button>
      </Form>
      {message && <div className="text-navy-900">{message}</div>}
      {error && <div className="text-tomato-500">{error}</div>}
    </>
  );
};

export default ForgotForm;
