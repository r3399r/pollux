import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type FormCheckboxGroupProps<T> = {
  name: Path<T>;
  control: Control<T>;
  options: string[];
  defaultValue?: string[];
  row?: boolean;
};

const FormCheckboxGroup = <T extends FieldValues>({
  name,
  control,
  options,
  defaultValue,
  row = true,
}: FormCheckboxGroupProps<T>) => {
  const { field } = useController({
    control,
    name,
  });
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    let value = options.map(() => false);
    if (defaultValue !== undefined) value = defaultValue.map((v) => (v === 'true' ? true : false));

    field.onChange(value.join());
    setChecked(value);
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
