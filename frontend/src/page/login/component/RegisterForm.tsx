import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/celestial-ui/component/Button';
import Form from 'src/celestial-ui/component/Form';
import FormInput from 'src/celestial-ui/component/FormInput';
import H1 from 'src/celestial-ui/component/typography/H1';
import { RegisterForm as FormType } from 'src/model/Form';
import { register } from 'src/service/authService';

const RegisterForm = () => {
  const methods = useForm<FormType>();
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string>();

  const onSubmit = (data: FormType) => {
    if (data.password !== data.confirmPassword)
      methods.setError('confirmPassword', { message: '與密碼不同' }, { shouldFocus: true });
    else
      register(data.email, data.password)
        .then(() => {
          setMessage('註冊成功，待驗證');
          setError(undefined);
        })
        .catch((e) => {
          setMessage(undefined);
          setError(e);
        });
  };

  return (
    <>
      <H1>註冊</H1>
      <Form methods={methods} onSubmit={onSubmit}>
        <FormInput name="email" label="Email" type="email" required />
        <FormInput
          name="password"
          label="密碼"
          type="password"
          required
          helper="密碼需至少 8 碼且含有大小寫英文字母及數字"
          minLength={8}
        />
        <FormInput
          name="confirmPassword"
          label="確認密碼"
          type="password"
          required
          placeholder="請再次輸入密碼"
        />
        <Button type="submit" className="mt-5">
          註冊
        </Button>
      </Form>
      {message && <div className="text-navy-900">{message}</div>}
      {error && <div className="text-tomato-500">{error}</div>}
    </>
  );
};

export default RegisterForm;
