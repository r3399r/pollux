import { useFormContext } from 'react-hook-form';
import Input, { Props as InputProps } from './Input';

/** usage note:
 *  Please see Form.tsx
 */

type Props = InputProps & {
  name: string;
  required?: boolean;
};

const FormInput = ({ name, required, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return <Input {...props} {...register(name, { required })} error={errors[name]?.message} />;
};

export default FormInput;
