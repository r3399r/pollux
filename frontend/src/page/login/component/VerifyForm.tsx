import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/celestial-ui/component/Button';
import Form from 'src/celestial-ui/component/Form';
import FormInput from 'src/celestial-ui/component/FormInput';
import H1 from 'src/celestial-ui/component/typography/H1';
import { VerifyForm as FormType } from 'src/model/Form';
import { verify } from 'src/service/authService';

const VerifyForm = () => {
  const methods = useForm<FormType>();
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string>();

  const onSubmit = (data: FormType) => {
    verify(data.email, data.code)
      .then(() => {
        setMessage('驗證成功');
        setError(undefined);
      })
      .catch((e) => {
        setMessage(undefined);
        setError(e);
      });
  };

  return (
    <>
      <H1>註冊驗證</H1>
      <Form methods={methods} onSubmit={onSubmit}>
        <FormInput name="email" label="Email" type="email" required />
        <FormInput name="code" label="驗證碼" type="password" required />
        <Button type="submit" className="mt-5">
          驗證
        </Button>
      </Form>
      {message && <div className="text-navy-900">{message}</div>}
      {error && <div className="text-tomato-500">{error}</div>}
    </>
  );
};

export default VerifyForm;
