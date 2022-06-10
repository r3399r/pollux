import { useFormContext } from 'react-hook-form';
import Input, { Props as InputProps } from './Input';

/** usage note:
 *  Please see Form.tsx
 */

type Props = InputProps & {
  name: string;
};

const FormInput = ({ name, ...props }: Props) => {
  const { register } = useFormContext();

  return <Input {...props} {...register(name)} />;
};

export default FormInput;
