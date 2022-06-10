import { useFormContext } from 'react-hook-form';
import Select, { Props as SelectProps } from './Select';

/** usage note:
 *  Please see Form.tsx
 */

type Props = SelectProps & {
  name: string;
};

const FormSelect = ({ name, children }: Props) => {
  const { setValue, getValues } = useFormContext();

  const onChange = (value: string) => {
    setValue(name, value);
  };

  return (
    <Select defaultValue={getValues(name)} onChange={onChange}>
      {children}
    </Select>
  );
};

export default FormSelect;
