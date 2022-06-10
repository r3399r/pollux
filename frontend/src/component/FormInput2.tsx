import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';

type FormInputProps<T> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions;
};

const FormInput = <T extends FieldValues>({
  name,
  control,
  rules,
  ...props
}: FormInputProps<T>) => (
  <Controller
    control={control}
    name={name}
    rules={rules}
    defaultValue={'' as any}
    render={({ field: { onChange, value } }) => (
      <TextField onChange={onChange} value={value} autoComplete="off" {...props} />
    )}
  />
);

export default FormInput;
