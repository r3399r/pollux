import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type FormInputProps<T> = TextFieldProps & {
  name: Path<T>;
  control: Control<T>;
  options: { value: string; label: string }[];
};

const FormSelect = <T extends FieldValues>({
  name,
  control,
  options,
  ...props
}: FormInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    defaultValue={'' as any}
    render={({ field: { onChange, value } }) => (
      <TextField onChange={onChange} value={value} select {...props}>
        {options.map((v, i) => (
          <MenuItem key={i} value={v.value}>
            {v.label}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
);

export default FormSelect;
