import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type FormCheckboxGroupProps<T> = {
  name: Path<T>;
  control: Control<T>;
  options: string[];
  row?: boolean;
};

const FormCheckboxGroup = <T extends FieldValues>({
  name,
  control,
  options,
  row = true,
}: FormCheckboxGroupProps<T>) => {
  const { field } = useController({
    control,
    name,
  });
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    field.onChange(options.map(() => false).join());
    setChecked(options.map(() => false));
  }, [options]);

  const handleChange = (i: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const checkedCopy = [...checked];
    checkedCopy[i] = event.target.checked;
    field.onChange(checkedCopy.join()); // send data to react hook form
    setChecked(checkedCopy); // update local state
  };

  return (
    <FormGroup row={row}>
      {options.length === checked.length &&
        options.map((v, i) => (
          <FormControlLabel
            key={i}
            control={<Checkbox checked={checked[i]} onChange={handleChange(i)} />}
            label={v}
          />
        ))}
    </FormGroup>
  );
};

export default FormCheckboxGroup;
