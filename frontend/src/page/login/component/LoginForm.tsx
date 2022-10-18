import { useForm } from 'react-hook-form';
import Button from 'src/component/celestial-ui/Button';
import Form from 'src/component/celestial-ui/Form';
import FormInput from 'src/component/celestial-ui/FormInput';
import H1 from 'src/component/celestial-ui/typography/H1';
import { LoginForm as FormType } from 'src/model/Form';
import { login } from 'src/service/authService';

const LoginForm = () => {
  const methods = useForm<FormType>();

  const onSubmit = (data: FormType) => {
    login(data.email, data.password);
  };

  return (
    <>
      <H1>登入</H1>
      <Form methods={methods} onSubmit={onSubmit}>
        <FormInput name="email" label="Email" type="email" required />
        <FormInput name="password" label="密碼" type="password" required />
        <Button type="submit" className="mt-5">
          登入
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
